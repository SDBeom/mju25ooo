import './App.css'

function App() {
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <div className="ks-logo">
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="dot-center"></div>
            <div className="ks-text">KS</div>
          </div>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-link">HOME</a>
          <a href="#" className="nav-link">ABOUT</a>
          <a href="#" className="nav-link">WORKS</a>
          <a href="#" className="nav-link">DESIGNER</a>
          <a href="#" className="nav-link">ARCHIVE</a>
        </nav>
      </div>
      
      <div className="app-container">
        <div className="left-section">
          <div className="circle-pattern">
            <div className="circle-row">
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle orange"></div>
              <div className="circle orange"></div>
              <div className="circle orange"></div>
              <div className="circle orange"></div>
              <div className="circle blue"></div>
            </div>
            <div className="circle-row">
              <div className="circle blue"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
            </div>
            <div className="circle-row">
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle white"></div>
              <div className="circle orange"></div>
              <div className="circle white"></div>
            </div>
            <div className="circle-row">
              <div className="circle orange"></div>
              <div className="circle white"></div>
              <div className="circle blue"></div>
              <div className="circle blue"></div>
              <div className="circle orange"></div>
              <div className="circle orange"></div>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="gray-rectangle"></div>
        </div>
      </div>
    </>
  )
}

export default App
