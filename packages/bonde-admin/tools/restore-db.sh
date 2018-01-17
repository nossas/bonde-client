nc='\033[0m' # No Color
green='\033[0;32m'
cyan='\033[0;36m'
light_gray='\033[0;37m'
dark_gray='\033[1;30m'

if [[ -z "${DSN_SRC}" ]]; then
  echo "${dark_gray}The enviroment variable DSN_SRC could not be found.${nc}\n"
  exit;
else
  src_psql_uri="${DSN_SRC}"
fi

[[ -z "${DSN_DEST}" ]] && dest_psql_uri='postgres://postgres:3x4mpl3@localhost:5432/bonde' || dest_psql_uri="${DSN_DEST}"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
dump_dir="$DIR/db-dumps"

echo "${light_gray}The plan is: ${cyan}src > dest${nc}"
echo "${green}[01/08]\t${light_gray}Initiating the automated dump process...${nc}"
echo "${dark_gray}Automated dump process initiated.${nc}\n"

echo "${green}[02/08]\t${light_gray}Generating filenames...${nc}"
filename="${dump_dir}/dump-`date +%Y%m%d-%H%M`.dump"
filename_original="${filename}.original"
filename_owner_changed="${filename}.owner-changed"
echo "${dark_gray}Filenames generated.${nc}\n"

echo "${green}[03/08]\t${light_gray}Generating the dump file...${nc}"
docker-compose exec -T postgres pg_dump ${src_psql_uri} > ${filename} &
pid=$!
trap "kill $pid 2> /dev/null" EXIT
while kill -0 $pid 2> /dev/null; do
  ls -lah $filename \
    | awk '{ printf "\033[1;30m\rDumping... \033[0;34m%s \033[1;30m~> \033[0;32m%s ", $9, $5 }';
  sleep 1;
done
echo ""
echo "${dark_gray}Dump completed. (${dump_dir}/${filename})\n"

echo "${green}[04/08]${nc}\t${light_gray}Changing the owners of the dump file...${nc}"
cp $filename $filename_original
sed -i.bak 's/OWNER TO reboo/OWNER TO postgres/g' $filename && rm "$filename.bak" && \
sed -i.bak 's/FROM reboo/FROM postgres/g' $filename && rm "$filename.bak" && \
sed -i.bak 's/TO reboo/TO postgres/g' $filename && rm "$filename.bak"
mv $filename $filename_owner_changed
echo "${dark_gray}Owners changed."

echo "${green}[05/08]${nc}\t${light_gray}Dropping the local database...${nc}"
docker-compose exec postgres psql $dest_psql_uri -c 'DROP SCHEMA PUBLIC CASCADE; DROP SCHEMA postgraphql CASCADE; CREATE SCHEMA PUBLIC; CREATE SCHEMA postgraphql;'
echo "${dark_gray}Database dropped.\n"

echo "${green}[06/08]${nc}\t${light_gray}Restoring dump file into local database...${nc}"
docker exec -i bondeclient_postgres_1 psql $dest_psql_uri < $filename_owner_changed
echo "${dark_gray}Dump restored.\n"

echo "${green}[07/08]${nc}\t${light_gray}Executing rails api migrations...${nc}"
docker-compose exec api-v1 rake db:migrate
echo "${dark_gray}Migrations executed.\n"

echo "${green}[08/08]${nc}\t${light_gray}Restarting graphql service...${nc}"
docker-compose restart api-v2
echo "${dark_gray}GraphQL restarted.\n"

echo "${cyan}Stored dump files:${nc}"
echo "${dark_gray}- ${filename_original}"
echo "${dark_gray}- ${filename_owner_changed}\n"

trap - EXIT
