const Info = ({cgpa}) => {
  
  const message = encodeURIComponent(`I tried the UC Hub CGPA calculator, here's my score: ${cgpa}. You should try it out too.`)
  const link = encodeURIComponent("https://uchubwaitlist.netlify.app/")
  // const twitterBtn = useRef(null)
  // twitterBtn.href = `http://twitter.com/share?&text=${message}&hashtags=uchub,cgpacalculator`
  
  return(
    <section>
      <div>
        <p className="mt-4 text-base text-center mobile:text-sm">Found this helpful? <a className="font-semibold underline text-primary-100" href="https://uchubwaitlist.netlify.app/">See more from UC Hub.</a></p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <h3 className="text-center mobile:w-[70%]">Satisfied with our CGPA generator? Share your score with us on twiiter?</h3>
        <a href={`http://twitter.com/share?&url=${link}&text=${message}&hashtags=uchub,cgpacalculator`} className="flex items-center justify-center gap-2 px-5 py-3 mt-6 rounded-full bg-primary-700 mobile:mt-4">
          <i class="bi bi-twitter-x"></i>
          <span className="text-[12px] font-bold ">Continue with Twitter</span>
        </a>
      </div> 
    </section>
  )
}

export default Info

