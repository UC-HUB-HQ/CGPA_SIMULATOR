import logo from '../assets/logo.svg'
const Nav = () => {
    return(
        <section className='flex items-center justify-between py-5 md:flex-col md:py-12 md:w-full md:gap-10'>
            <div className='md:w-full md:flex md:justify-center md:items-center'>
                <img src={logo} alt="uc hub logo" />
            </div>
            <div className=' md:w-full md:flex md:justify-center md:items-center'>
                <nav>
                    <ul className='flex gap-5 font-bold md:text-2xl md:gap-14 mobile:text-lg'>
                        <li>
                            <a className=' text-black-100' href="https://theuchub.com/">Home</a>
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
