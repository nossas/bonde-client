# Bonde

Esta documentação é destinada a pessoas desenvolvedoras que queiram contribuir com a plataforma. Todo o código utilizado para a construção da plataforma está presente nesse repositório ou carregado a partir desse, e está dividido nos seguintes serviços: client, infra, lib, manual, server e dados.

**O client,** é destinado a página web do tipo "Single Page Application", criadas a partir do create-react-app.

**O infra,** é destinado as configurações dos serviços utilizados como dependência dos serviços construídos, como load balance, banco de dados, etc.

**O lib,** é destinado as bibliotecas mantidas e publicadas no npmjs.com.

**O manual,** é destinado ao blog de atualizações e documentação pública das tecnologias desenvolvidas.

**O server,** é destinado a servidores web expressjs, criados a partir de um boilerplate mínimo, além de necessidades como log, monitor e gerenciamento de processos.

**O dados,** é destinado a scripts em python criados para análises específicas e algumas mais genéricas.

Ao todo são mais de 35 pacotes de código-fonte com propósitos diferentes. Abaixo um quadro para exemplificar o conteúdo dos repositórios:

```
    3299 text files.
    2961 unique files.                                          
     540 files ignored.

--------------------------------------------------------------------------------
Language                      files          blank        comment           code
--------------------------------------------------------------------------------
YAML                             68            502            923          88869
TypeScript                     1127           6232           2691          56047
JSON                            136             24              0          47700
Go                              141           6868           6872          37481
Ruby                            607           3460            544          26099
JavaScript                      243           2027           3675          11059
SQL                             181           3463           2771           8089
HTML                             18           2907            300           7118
Markdown                        129           2751              0           6380
SVG                              10             15              2           2850
CSS                              33            154            113           1574
Sass                             20            172              4           1150
JSX                              23            103             43           1148
Protocol Buffers                  3             83             94            457
Pug                               5             30              0            416
GraphQL                           8             56              0            301
ERB                              10              8              6            214
Dockerfile                       22            104             27            163
Bourne Shell                      5             39             36            121
make                              3             29             62            115
HCL                               2              9              0             52
TOML                              4              8             19             29
Bourne Again Shell                2              6              2             15
--------------------------------------------------------------------------------
SUM:                           2800          29050          18184         297447
--------------------------------------------------------------------------------
```

## Build, Deploy e Release

Todos os repositórios possuem uma configuração(skaffold.yaml) na raiz, responsável por fazer o build, deploy e release no kubernetes. A configuração deve estar no diretório correto(k8s/).

Além disso, existe uma configuração(.drone.yml) para automatizar a execução de testes(ci) e de deploy(cd) descritos na configuração do skaffold, também dividido por repositório.

## Clientes

Você irá encontrar o accounts, admin-canary, redes e cross-storage. E mais o admin, no branch feature/v2.0.x.

[Veja mais clicando aqui.](client/README.md)

## Infra-estrutura

Todas as configurações necessárias para carregar no cluster kubernetes o Load Balance, o Banco de dados e o armazenamento de arquivos, etc É utilizado o Helm, gerenciador de pacotes de configuração kubernetes para alguns serviços comuns.

[Veja mais clicando aqui.](devops/README.md)

## Bibliotecas

O design system(components) utilizado pelos clientes; funções compartilhadas(core-tools) pelos clientes e servidores; interface para desenhar diagramas customizáveis(diagram); e o editor de texto rico destinado a potencializar a edição de páginas(editor).

[Veja mais clicando aqui.](libs/README.md)

## Documentação

Utilizamos o Gastby para publicar um blog estático e algumas páginas de documentação para o usuários finais: o mobilizador e o ativista.

[Veja mais clicando aqui.](manual/README.md)

## Servidores

A APIs: REST, Graphql e Graphql Deprecated;

Os monorepos: chatbot, experiments, mapa do acolhimento, redes, webhooks;

E ainda: migrations, payments, phone, redirect, webpage.

[Veja mais clicando aqui.](server/README.md)

## Dados

Serviços com algoritmos de análise constante e customizadas.

[Veja mais clicando aqui.](dados/README.md)

## Arquitetura

Em modo de desenvolvimento, as aplicações são acessadas em 3 camadas de rede. O nível mais alto é através das requisições http que trafegam pelo traefik utilizando imagens pré-fabricadas. O segundo nível, é através das portas locais de desenvolvimento, alterações são refletidas em tempo de execução. E no terceiro nível, através das bibliotecas, reconstruídas em tempo de execução.


