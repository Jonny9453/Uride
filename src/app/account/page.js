import SupportIcon from '@mui/icons-material/Support';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PaymentIcon from '@mui/icons-material/Payment';
import "./page.css"

export default function page() {
  return (
    <>
          <aside className="help-container">
            <div>
                <SupportIcon className='Icon'/>
            </div>
            <div>
                <PaymentIcon className='Icon'/>
            </div>
            <div>
                <LocalActivityIcon className='Icon'/>
            </div>
          </aside>
    </>
  )
}
