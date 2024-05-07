const Info = ({cgpa}) => {
  
  const message = encodeURIComponent(`I tried the UC Hub CGPA calculator, here's my score: ${cgpa}. You should try it out too.`)
  // const link = encodeURIComponent("https://uchubwaitlist.netlify.app/")
  // const twitterBtn = useRef(null)
  // twitterBtn.href = `http://twitter.com/share?&text=${message}&hashtags=uchub,cgpacalculator`
  // http://x.com/share?&url=${link}&text=${message}&hashtags=uchub,cgpacalculator
  
  
  return(
    <section>
      <div>
        <p className="mt-4 text-base text-center mobile:text-sm">Found this helpful? <a className="font-semibold underline text-primary-100" href="https://uchubwaitlist.netlify.app/">See more from UC Hub.</a></p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <h3 className="text-center mobile:w-[70%]">Satisfied with our CGPA generator? Share your score with us on twiiter?</h3>
        <a rel="canonical" href={`https://twitter.com/intent/tweet?text=${message}&hashtags=uchub,cgpacalculator&via=@uc_hub_`} class="twitter-share-button flex items-center justify-center gap-2 px-5 py-3 mt-6 rounded-full bg-primary-700 mobile:mt-4" data-size="large" data-show-count="false">
          <i class="bi bi-twitter-x"></i>
          <span className="text-[12px] font-bold ">Continue with Twitter</span>
        </a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div> 


    </section>
  )
}

export default Info

