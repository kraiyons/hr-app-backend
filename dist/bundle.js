/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const index_routes_1 = __importDefault(__webpack_require__(/*! ./src/routes/index.routes */ "./src/routes/index.routes.ts"));
dotenv_1.default.config();
const app = express_1.default();
const { PORT, MONGO_DB } = process.env;
console.log({ PORT, MONGO_DB, process });
app.use(express_1.default.json());
// CORS config
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    next();
});
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(process.env.MONGO_DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Succesfully connected to the database');
//   })
//   .catch((err) => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
//   });
app.use('/', index_routes_1.default);
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});


/***/ }),

/***/ "./src/models/user.model.ts":
/*!**********************************!*\
  !*** ./src/models/user.model.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
const mongoose_1 = __importStar(__webpack_require__(/*! mongoose */ "mongoose"));
const UserSchema = new mongoose_1.Schema({
    _id: { type: mongodb_1.ObjectId, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    country: { type: String, required: false },
    jobTitle: { type: String, required: false },
    dateJoined: { type: Date, required: false },
    inactive: { type: Boolean, default: false },
}, {
    collection: 'users', // Without this attribute the collection won't be retrieved
});
// model name, schema, ?collection name
const User = mongoose_1.default.model('user', UserSchema);
exports.default = User;


/***/ }),

/***/ "./src/routes/index.routes.ts":
/*!************************************!*\
  !*** ./src/routes/index.routes.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const user_routes_1 = __importDefault(__webpack_require__(/*! ./user.routes */ "./src/routes/user.routes.ts"));
const router = express_1.Router();
router.get('/', (req, res) => {
    res.status(200).send('Server is running');
});
router.use('/user', user_routes_1.default);
exports.default = router;


/***/ }),

/***/ "./src/routes/user.routes.ts":
/*!***********************************!*\
  !*** ./src/routes/user.routes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const user_service_1 = __webpack_require__(/*! ../services/user.service */ "./src/services/user.service.ts");
const userRouter = express_1.Router();
/**
 * POST: Get Students list
 */
userRouter.post('/list', (req, res) => {
    user_service_1.getUsers(req, res);
});
exports.default = userRouter;


/***/ }),

/***/ "./src/services/user.service.ts":
/*!**************************************!*\
  !*** ./src/services/user.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(__webpack_require__(/*! ../models/user.model */ "./src/models/user.model.ts"));
const lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
async function getUsers(req, res) {
    const query = user_model_1.default.find();
    const filterQueryArray = new Array();
    filterQueryArray.push({ inactive: { $ne: true } });
    if (req.body.name) {
        filterQueryArray.push({ firstName: { $regex: req.body.name } });
        filterQueryArray.push({ lastName: { $regex: req.body.name } });
        filterQueryArray.push({ middleName: { $regex: req.body.name } });
    }
    if (!lodash_1.default.isEmpty(filterQueryArray)) {
        query.or(filterQueryArray);
    }
    await query
        .sort({ firstName: 1, lastName: 1 })
        .exec()
        .then((students) => {
        console.log('**** SUCCESS');
        return res.send(students);
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.getUsers = getUsers;
async function insertUser(req, res) {
    //req.body._id = new mongoose.Types.ObjectId();
    req.body._id = uuid_1.v4();
    console.log(`_ID: ${req.body._id}`);
    await user_model_1.default.create({
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        country: req.body.country,
        jobTitle: req.body.jobTitle,
        dateJoined: req.body.dateJoined,
        inactive: req.body.inactive,
    })
        .then((student) => {
        return res.status(200).send();
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.insertUser = insertUser;


/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hyLWFwcC1iYWNrZW5kLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvLi9zcmMvbW9kZWxzL3VzZXIubW9kZWwudHMiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvLi9zcmMvcm91dGVzL2luZGV4LnJvdXRlcy50cyIsIndlYnBhY2s6Ly9oci1hcHAtYmFja2VuZC8uL3NyYy9yb3V0ZXMvdXNlci5yb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvLi9zcmMvc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIiwid2VicGFjazovL2hyLWFwcC1iYWNrZW5kL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly9oci1hcHAtYmFja2VuZC9leHRlcm5hbCBcIm1vbmdvZGJcIiIsIndlYnBhY2s6Ly9oci1hcHAtYmFja2VuZC9leHRlcm5hbCBcIm1vbmdvb3NlXCIiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvZXh0ZXJuYWwgXCJ1dWlkXCIiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9oci1hcHAtYmFja2VuZC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vaHItYXBwLWJhY2tlbmQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9zcmMvcm91dGVzL2luZGV4LnJvdXRlcyc7XHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcblxyXG5jb25zdCB7IFBPUlQsIE1PTkdPX0RCIH0gPSBwcm9jZXNzLmVudjtcclxuY29uc29sZS5sb2coeyBQT1JULCBNT05HT19EQiwgcHJvY2VzcyB9KTtcclxuYXBwLnVzZShleHByZXNzLmpzb24oKSk7XHJcbi8vIENPUlMgY29uZmlnXHJcbmFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTsgLy8gdXBkYXRlIHRvIG1hdGNoIHRoZSBkb21haW4geW91IHdpbGwgbWFrZSB0aGUgcmVxdWVzdCBmcm9tXHJcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnLCAndHJ1ZScpO1xyXG4gIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLCAnKicpO1xyXG4gIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnUE9TVCwgUFVULCBHRVQsIE9QVElPTlMnKTtcclxuICBuZXh0KCk7XHJcbn0pO1xyXG5cclxuLy8gbW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xyXG4vLyBtb25nb29zZVxyXG4vLyAgIC5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPX0RCLCB7XHJcbi8vICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXHJcbi8vICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXHJcbi8vICAgfSlcclxuLy8gICAudGhlbigoKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZygnU3VjY2VzZnVsbHkgY29ubmVjdGVkIHRvIHRoZSBkYXRhYmFzZScpO1xyXG4vLyAgIH0pXHJcbi8vICAgLmNhdGNoKChlcnIpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdDb3VsZCBub3QgY29ubmVjdCB0byB0aGUgZGF0YWJhc2UuIEV4aXRpbmcgbm93Li4uJywgZXJyKTtcclxuXHJcbi8vICAgICBwcm9jZXNzLmV4aXQoKTtcclxuLy8gICB9KTtcclxuXHJcbmFwcC51c2UoJy8nLCByb3V0ZXIpO1xyXG5cclxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XHJcbiAgY29uc29sZS5sb2coYEV4YW1wbGUgYXBwIGxpc3RlbmluZyBhdCBodHRwOi8vbG9jYWxob3N0OiR7UE9SVH1gKTtcclxufSk7XHJcbiIsImltcG9ydCB7IE9iamVjdElkIH0gZnJvbSAnbW9uZ29kYic7XHJcbmltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBDb2xsZWN0aW9uIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyU2VhcmNoUmVxdWVzdER0byB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJJbnRlcmZhY2UgZXh0ZW5kcyBEb2N1bWVudCB7XHJcbiAgX2lkOiBPYmplY3RJZDtcclxuICBlbWFpbDogU3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBTdHJpbmc7XHJcbiAgZmlyc3ROYW1lOiBTdHJpbmc7XHJcbiAgbGFzdE5hbWU6IFN0cmluZztcclxuICBtaWRkbGVOYW1lOiBTdHJpbmc7XHJcbiAgZGF0ZU9mQmlydGg6IERhdGU7XHJcbiAgY291bnRyeTogU3RyaW5nO1xyXG4gIGpvYlRpdGxlOiBTdHJpbmc7XHJcbiAgZGF0ZUpvaW5lZDogRGF0ZTtcclxuICBpbmFjdGl2ZTogQm9vbGVhbjtcclxufVxyXG5cclxuY29uc3QgVXNlclNjaGVtYTogU2NoZW1hID0gbmV3IFNjaGVtYShcclxuICB7XHJcbiAgICBfaWQ6IHsgdHlwZTogT2JqZWN0SWQsIHVuaXF1ZTogdHJ1ZSB9LFxyXG4gICAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UgfSxcclxuICAgIHBhc3N3b3JkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlIH0sXHJcbiAgICBmaXJzdE5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UgfSxcclxuICAgIGxhc3ROYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlIH0sXHJcbiAgICBtaWRkbGVOYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlIH0sXHJcbiAgICBkYXRlT2ZCaXJ0aDogeyB0eXBlOiBEYXRlLCByZXF1aXJlZDogZmFsc2UgfSxcclxuICAgIGNvdW50cnk6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogZmFsc2UgfSxcclxuICAgIGpvYlRpdGxlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlIH0sXHJcbiAgICBkYXRlSm9pbmVkOiB7IHR5cGU6IERhdGUsIHJlcXVpcmVkOiBmYWxzZSB9LFxyXG4gICAgaW5hY3RpdmU6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbGxlY3Rpb246ICd1c2VycycsIC8vIFdpdGhvdXQgdGhpcyBhdHRyaWJ1dGUgdGhlIGNvbGxlY3Rpb24gd29uJ3QgYmUgcmV0cmlldmVkXHJcbiAgfVxyXG4pO1xyXG5cclxuLy8gbW9kZWwgbmFtZSwgc2NoZW1hLCA/Y29sbGVjdGlvbiBuYW1lXHJcbmNvbnN0IFVzZXIgPSBtb25nb29zZS5tb2RlbDxVc2VySW50ZXJmYWNlPigndXNlcicsIFVzZXJTY2hlbWEpO1xyXG5leHBvcnQgZGVmYXVsdCBVc2VyO1xyXG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHVzZXJSb3V0ZXMgZnJvbSAnLi91c2VyLnJvdXRlcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoJy8nLCAocmVxLCByZXMpID0+IHtcclxuICByZXMuc3RhdHVzKDIwMCkuc2VuZCgnU2VydmVyIGlzIHJ1bm5pbmcnKTtcclxufSk7XHJcblxyXG5yb3V0ZXIudXNlKCcvdXNlcicsIHVzZXJSb3V0ZXMpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IFVzZXJTZWFyY2hSZXF1ZXN0RHRvIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBnZXRVc2VycyB9IGZyb20gJy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XHJcbmNvbnN0IHVzZXJSb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbi8qKlxyXG4gKiBQT1NUOiBHZXQgU3R1ZGVudHMgbGlzdFxyXG4gKi9cclxudXNlclJvdXRlci5wb3N0KFxyXG4gICcvbGlzdCcsXHJcbiAgKHJlcTogUmVxdWVzdDxVc2VyU2VhcmNoUmVxdWVzdER0bz4sIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGdldFVzZXJzKHJlcSwgcmVzKTtcclxuICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyUm91dGVyO1xyXG4iLCJpbXBvcnQgVXNlciwge1xyXG4gIFVzZXJJbnRlcmZhY2UsXHJcbiAgVXNlclNlYXJjaFJlcXVlc3REdG8sXHJcbn0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBGaWx0ZXJRdWVyeSB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VycyhcclxuICByZXE6IFJlcXVlc3Q8VXNlclNlYXJjaFJlcXVlc3REdG8+LFxyXG4gIHJlczogUmVzcG9uc2U8QXJyYXk8VXNlckludGVyZmFjZT4+XHJcbikge1xyXG4gIGNvbnN0IHF1ZXJ5ID0gVXNlci5maW5kKCk7XHJcbiAgY29uc3QgZmlsdGVyUXVlcnlBcnJheTogQXJyYXk8RmlsdGVyUXVlcnk8VXNlckludGVyZmFjZT4+ID0gbmV3IEFycmF5PFxyXG4gICAgRmlsdGVyUXVlcnk8VXNlckludGVyZmFjZT5cclxuICA+KCk7XHJcbiAgZmlsdGVyUXVlcnlBcnJheS5wdXNoKHsgaW5hY3RpdmU6IHsgJG5lOiB0cnVlIH0gfSk7XHJcblxyXG4gIGlmIChyZXEuYm9keS5uYW1lKSB7XHJcbiAgICBmaWx0ZXJRdWVyeUFycmF5LnB1c2goeyBmaXJzdE5hbWU6IHsgJHJlZ2V4OiByZXEuYm9keS5uYW1lIH0gfSk7XHJcbiAgICBmaWx0ZXJRdWVyeUFycmF5LnB1c2goeyBsYXN0TmFtZTogeyAkcmVnZXg6IHJlcS5ib2R5Lm5hbWUgfSB9KTtcclxuICAgIGZpbHRlclF1ZXJ5QXJyYXkucHVzaCh7IG1pZGRsZU5hbWU6IHsgJHJlZ2V4OiByZXEuYm9keS5uYW1lIH0gfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoIV8uaXNFbXB0eShmaWx0ZXJRdWVyeUFycmF5KSkge1xyXG4gICAgcXVlcnkub3IoZmlsdGVyUXVlcnlBcnJheSk7XHJcbiAgfVxyXG5cclxuICBhd2FpdCBxdWVyeVxyXG4gICAgLnNvcnQoeyBmaXJzdE5hbWU6IDEsIGxhc3ROYW1lOiAxIH0pXHJcbiAgICAuZXhlYygpXHJcbiAgICAudGhlbigoc3R1ZGVudHMpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJyoqKiogU1VDQ0VTUycpO1xyXG4gICAgICByZXR1cm4gcmVzLnNlbmQoc3R1ZGVudHMpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0VXNlcihyZXE6IFJlcXVlc3Q8VXNlckludGVyZmFjZT4sIHJlczogUmVzcG9uc2UpIHtcclxuICAvL3JlcS5ib2R5Ll9pZCA9IG5ldyBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpO1xyXG4gIHJlcS5ib2R5Ll9pZCA9IHV1aWR2NCgpO1xyXG4gIGNvbnNvbGUubG9nKGBfSUQ6ICR7cmVxLmJvZHkuX2lkfWApO1xyXG4gIGF3YWl0IFVzZXIuY3JlYXRlKHtcclxuICAgIF9pZDogcmVxLmJvZHkuX2lkLFxyXG4gICAgZmlyc3ROYW1lOiByZXEuYm9keS5maXJzdE5hbWUsXHJcbiAgICBsYXN0TmFtZTogcmVxLmJvZHkubGFzdE5hbWUsXHJcbiAgICBkYXRlT2ZCaXJ0aDogcmVxLmJvZHkuZGF0ZU9mQmlydGgsXHJcbiAgICBjb3VudHJ5OiByZXEuYm9keS5jb3VudHJ5LFxyXG4gICAgam9iVGl0bGU6IHJlcS5ib2R5LmpvYlRpdGxlLFxyXG4gICAgZGF0ZUpvaW5lZDogcmVxLmJvZHkuZGF0ZUpvaW5lZCxcclxuICAgIGluYWN0aXZlOiByZXEuYm9keS5pbmFjdGl2ZSxcclxuICB9KVxyXG4gICAgLnRoZW4oKHN0dWRlbnQpID0+IHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBnZXRVc2VycywgaW5zZXJ0VXNlciB9O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29kYlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9