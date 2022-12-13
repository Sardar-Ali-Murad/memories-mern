import {Navbar,Home,GPT,CaseStudies,Library,Footer} from "./components/index"

function App() {
  return (
    <div className="App" style={{background:"black"}}>
       <Navbar/>
       <Home/>
       <GPT/>
       <CaseStudies/>
       <Footer/>
    </div>
  );
}

export default App;
