/** =============================================================================
 *  Express App 작성
 *  https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli
 *
 *  1. 프로젝트 생성
 *  2. npm install --save express body-parer
 *  3. server.js와 routes/api.js 작성
 *  4. ng build 명령으로 dist 디렉토리 생성
 *  5. node server.js로 작동
 *  6. Angular App (http://localhost:4200) | Express API (http://localhost:3000) 확인
 *  7. 자동 로딩환경 구성 (https://medium.com/@danielkagan/serve-mean-stack-using-angular-cli-f39b33dbad64)
 *  ============================================================================= */

// 의존성 관리도구 불러오기
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// server/routes/api.js 파일을 API 라우트로 설정
const api = require('./server/routes/api');
const app = express();

// POST 데이터 파싱
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// dist 디렉토리로 정적 파일 고정
app.use(express.static(path.join(__dirname, 'public')));

// API 라우트 설정
app.use('/api', api);

// 기타 모든 라우트를 index.html 통합
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Express App port 3000으로 설정.
const port = process.env.PORT || '3000';
app.set('port', port);

// HTTP 서버 생성
const server = http.createServer(app);

// 포트 열람 및 네트워크 인터페이스에 정보 제공
server.listen(port, () => console.log(`API running on localhost:${port}`));