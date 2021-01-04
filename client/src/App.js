import './App.css';

import PostCreate from './components/PostCreate';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App-content">
      <h1>Blog App</h1>
      <PostCreate></PostCreate>
      <hr></hr>
      <h1>Posts</h1>
      <PostList></PostList>
    </div>
  );
}

export default App;
