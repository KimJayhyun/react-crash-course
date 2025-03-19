import Post from './components/Post';

function App() {
  return <div className='post'>
    <Post author="Maximilian" body="React.js is awesome!" />
    <Post author="Manuel" body="Check out full course!"/>
  </div>;
}

export default App;
