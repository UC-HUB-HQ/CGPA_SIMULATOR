import logo from '../assets/logo.svg'
const Nav = () => {
    return(
        <section className='flex items-center justify-between py-5'>
            <div>
                <img src={logo} alt="uc hub logo" />
            </div>
            <div>
                <nav>
                    <ul className='flex gap-5 font-bold'>
                        <li>
                            <a className=' text-black-100' href="https://uchubwaitlist.netlify.app/">Home</a>
                        </li>
                        <li className='underline text-primary-100'>
                            CGPA Simulator
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    )
}

export default Nav
