// TODO (sprada): Investigate error handling with server-side rendering
export default function (err, req, res, next) {
  // Debug
  // console.log(err);
  if(err && err.output){
    const { payload, statusCode } = err.output;

    return res.status(statusCode).send(payload);
  }

  return res.status(500).send(err);
};
