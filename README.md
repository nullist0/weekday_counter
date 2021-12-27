# Weekday Counter for Korea

[![Weekday Counter](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/49foyi&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/49foyi/runs)

한국 공휴일을 제외한 평일 수를 세는 웹입니다. 공휴일을 제외한 평일 수를 세는 방법이 엑셀밖에 없어 접근성이 좋은 웹으로 구현하였습니다.

[공공 데이터 포털의 오픈 API](https://www.data.go.kr/)를 사용하였으며, CORS문제를 해결하기 위해 Heroku에 등록한 [Node.js Express 서버](https://github.com/nullist0/weekday_counter_express)로부터 데이터를 받아옵니다.

배포된 사이트는 [이 곳](https://nullist0.github.io/weekday_counter/)에서 보실 수 있으며, Deployments에서도 확인가능합니다.
