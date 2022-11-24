import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// Styles
import './Navbar.css'

// Components
import Searchbar from './Searchbar'

export default function Navbar() {

  const { color, changeColor } = useTheme()

  console.log('color', color);

  return (
    <div className="navbar" style={{ background: color}}>
      <nav onClick={() => changeColor('pink')}>
        <Link to="/" className="brand">
          <h1>Home Recipes</h1>
        </Link>
        <Searchbar/>
        <Link to="/create">Create Recipe</Link>
        
      </nav>
    </div>
  )
}
