backend/
├── src/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── game.routes.js
│   │   └── user.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── game.controller.js
│   │   └── user.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── game.service.js
│   │   └── user.service.js
│   │
│   ├── models/
│   │   ├── Game.js
│   │   └── User.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── game/
│   │   ├── board.js
│   │   ├── moves.js
│   │   ├── figures/
│   │   └── validation.js
│   │
│   ├── config/
│   │   └── database.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
└── package.json