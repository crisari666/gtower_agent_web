import { NavLinkPersist } from '../../supports/Persistence'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { signOut } from '../../features/auth/redux/auth-thunks'
import style from './nav.module.scss'

export function Nav() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLoading } = useSelector((state: RootState) => state.auth)

  const className = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? style.active : ''} ${style.link}`
  }

  const handleLogout = () => {
    dispatch(signOut())
  }

  return (
    <nav>
      <NavLinkPersist className={className} to='/'>Home</NavLinkPersist>
      <NavLinkPersist className={className} to='/page1'>Page 1</NavLinkPersist>
      <NavLinkPersist className={className} to='/page2'>Page 2</NavLinkPersist>
      <NavLinkPersist className={className} to='/page3'>Page 3</NavLinkPersist>
      <NavLinkPersist className={className} to='/customer'>Customer</NavLinkPersist>
      <NavLinkPersist className={className} to='/agent'>Agent</NavLinkPersist>
      
      {user && (
        <div className={style['user-section']}>
          <span className={style['user-name']}>Welcome, {user.username}</span>
          <button 
            className={style['logout-button']} 
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    </nav>
  )
}
