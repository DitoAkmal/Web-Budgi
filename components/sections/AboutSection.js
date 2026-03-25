export default function AboutSection() {
  return (
    <section id="about" className="section-bg about-bg py-32">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-semibold text-center mb-20">
          Track ur Budget Activity
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="grid grid-cols-2 gap-6">

            <div className="img-frame aspect-[4/4]">
              <img src="/images/calender.png" />
            </div>

            <div className="img-frame aspect-[4/4]">
              <img src="/images/chart.png" />
            </div>

            <div className="img-frame col-span-2 aspect-[5/3]">
              <img src="/images/chart.png" />
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