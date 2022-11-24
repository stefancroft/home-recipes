import { Link } from 'react-router-dom'

// Styles
import './Navbar.css'

// Components
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Home Recipes</h1>
        </Link>
        <Searchbar/>
        <Link to="/create">Create Recipe</Link>
        
      </nav>
    </div>
  )
}
