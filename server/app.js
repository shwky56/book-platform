import express from 'express';
import UserAPIView from './user/api/views.js';
import BookAPIView from './book/api/views.js';
import RequestAPIView from './request/api/views.js';
import ChapterAPIView from './chapter/api/views.js';
import userRoutes from './rest-auth/api/router.js';
import bookView from './book/views.js';
import {
  isAdmin,
  isAuth,
  isAdminOrReadOnly,
  isReaerOrReadOnly
} from './rest-auth/permissions.js';
import pdf from './static-file/view.js'
const app = express();

app.use('/ss', express.static("upload"));
app.use((express.json({ limit: "30mb", extended: true})));
app.use((express.urlencoded({ limit: "30mb", extended: true})));
app.use('/book', bookView)
app.use('/users', userRoutes)
app.use('/pdf', pdf);
app.use('/api/user', isAuth, UserAPIView.getRouter());
app.use('/api/book', isAdminOrReadOnly, BookAPIView.getRouter());
app.use('/api/request', RequestAPIView.getRouter());
app.use('/api/chapter', ChapterAPIView.getRouter());


app.listen(8000, () => {
  console.log('Server listening on port 3000');
});
