
export default function AboutSection() {
  return (
    <section id="about" className="section-bg about-bg py-32">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-semibold text-center mb-20">
          Track ur Budget Activity
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="grid grid-cols-2 gap-6">

            <div className="bg-[#D7B8D9]/80 border border-white/20 rounded-2xl p-4 backdrop-blur-md aspect-[4/4]">

              <img src="/images/Calender.png" 

              className="w-full h-auto rounded-xl"/>
            </div>

            <div className="bg-[#D7B8D9]/80 border border-white/20 rounded-2xl p-4 backdrop-blur-md aspect-[4/4]">
              <img src="/images/chart.png" 
              className="w-full h-auto rounded-xl"/>
            </div>

            <div className="col-span-2 bg-[#b79bbd]/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col justify-center">

                <h3 className="text-lg font-semibold mb-3">
                  What is Budgi
                </h3>

                <p className="text-sm leading-relaxed">
                  Budgi helps you manage your finances in a simple and structured way.
                  You can track every transaction, organize your spending, and monitor your budget in real time.
                </p>

                <p className="text-sm leading-relaxed mt-3">
                  With a clean interface and practical features, Budgi makes it easier for you to stay in control of your money and reach your financial goals without complexity.
                </p>

              </div>

          </div>

          <div className="img-frame aspect-[7/5]">
            <img src="/images/Right img.png" />
          </div>

        </div>

      </div>

    </section>
  )
}