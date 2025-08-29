import { SignInForm } from '../../features/auth'
import styles from './signin_page.module.scss'

export default function SignInPage() {
  return (
    <div className={styles['sign-in-page']}>
      <div className={styles['sign-in-container']}>
        <h1>Welcome Back</h1>
        <p>Please sign in to continue</p>
        <SignInForm />
      </div>
    </div>
  )
}