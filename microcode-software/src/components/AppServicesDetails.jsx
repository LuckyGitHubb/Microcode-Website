import React from 'react'
import { Link } from 'react-router-dom'

function AppServicesDetails() {
  return (
    <div>
      <div className="services-details-area default-padding">
        <div className="cotnainer">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="site-heading text-center">
                <h4 className="sub-title">Social Media Marketing</h4>
                <h1 className="title">Social Media That Works, Marketing That Converts</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-xl-12 services-single-content">
                <div className="thumb mb-50">
                  <img src="static/img/mobile/21.webp" alt="Thumb" title='Application Development' />
                </div>
                <p>
                  In this digital world, social media is vital for brand engagement and Microcode Software has a great reputation for social media marketing. As one of the top social media marketing agencies, we grow online visibility, enhance brand awareness and provide meaningful engagement for your business. With experts in content creation, social media strategists and data analysts, we can develop <Link to='/performance-marketing'>campaigns</Link> for your audience. We keep your brand trending and up to date, whatever the platform, be it Facebook, LinkedIn, Instagram or Twitter.
                </p>
                <h2>Engage Authentically, Grow Consistently</h2>
                <p>
                  <strong>Employee-Generated Content (EGC):</strong> The New Trust Driver Employee-generated content (EGC) is quickly becoming an important trust driver, while influencer and user-generated content dominates the majority of strategies. When your team shares behind-the-scenes looks, company culture, and their perspectives on their private channels, it adds a human aspect to your brand. EGC not only creates internal brand advocates but also provides content that is authentic and relatable at a level that is more meaningful to audiences and builds credibility that you cannot buy. Choosing a local social media marketing agency can help encourage EGC more effectively through authentic storytelling.
                </p>
                <p>
                  <strong> Social Commerce 2.0:</strong> No Longer Just a Shopping Cart - It’s a Store Similar to how social media has matured, social commerce has become a store. Look for brands in 2025 to launch full-on shopping experiences inside of Instagram and Facebook. Stop thinking about social commerce as just a shopping cart and think of it as a store. Everything from discovery to checkout is done natively, showing users a path to purchase without any friction. Every time users say, "Send me to the cart, I do it!" or "I accept, I identified with the shop on Instagram, and the shop is now my on-platform payment experience." For brands, this frictionless shopping experience is driving higher conversions and is predicted to move faster than traditional e-commerce for many consumer categories this year. Get support from social media ad services to capitalize on this trend.
                </p>
                <p><strong>Hyper-Personalization, With the Help of AI:</strong> Expertise to Expertise Things have changed from personalization to hyper-personalization. With the existing real-time data that we get and with the advances in AI, our personalization tools are scanning our user behavior, preferences, and location, and we can even analyze user emotions to create relevant content and offers that are dynamically tailored based on our inputs. Picture personalized product recommendations like your full playlist curated by an AI, your shopping journey that feels like no one in the world has your exact shopping experience.
                </p>
                <p><strong>Niche and Micro Communities:</strong> Brands are transitioning from mass appeal to micro-focus by creating niche communities based around a specific interest, identity, or lifestyle. These communities thrive online, and increasingly, they take place in real life through meetups, events, or private memberships. Invest in creating meaningful spaces such as Discord groups, premium content hubs, or pop-up events to build connection, advocacy, and enduring loyalty.
                </p>
                <p><strong>Brand Transparency:</strong> Transparency in 2025 will not be nice, but it will be a must. Consumers want to see transparency about your values, sourcing, and practices, as well as your mess-ups. The brands that honestly tell your story consistently over time generate the most powerful emotional bonds with customers. Use your channels to expose the real people behind the business, share your journey toward sustainability, and share your response to feedback publicly. Ask yourself this: what is your biggest distinct competitive edge? Authenticity.

                </p>
                <p><strong>Social Search Optimization:</strong> Social networks/social media have become the discovery engines, especially for Gen Z and Gen Alpha. Social search optimization is now a must. You can increase your discoverability by simply structuring your media with searchable captions, relevant keywords, hashtags, and relevant video metadata. Brands should include optimization for Instagram Reels, YouTube Shorts, and Pinterest Search as part of their digital strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-content bg-gray default-padding">
        <div className="container">
          <div className="about-style-one-items">
            <div className="row align-items-center">

              <div className="col-xl-7 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                <div className="about-style-one-info">
                  <div className="content">
                    <h2 className="title">
                      Utilizing Social Listening for Growth
                    </h2>
                    <p>
                      Social listening allows brands to identify trends, improve products, and enhance customer experience while defending their reputation. By tracking conversations across a variety of platforms, companies are able to spot trends to create better content, recognize influencers, and make faster and smarter decisions to ensure long-lasting growth.

                    </p>
                    <a class="btn btn-md circle btn-gradient animation mb-20 mb-lg-0" href="/contact" data-discover="true">Contact Us</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="thumb-style-one">
                  <img src="static/img/mobile/2.webp" alt="Img Not Found" title='Application Development' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='services-details-area default-padding'>
        <div className='container'>
          <div className="process-style-one-items mt-50">
            <div className="choose-us-one-thumb">
              <div className="content">
                <div className="left-info">
                  <h2 className="title">
                    Fuel Your Brand from Strategy to Success
                  </h2>
                </div>
                <div className="process-style-one">
                  <div className="process-style-one-item">
                    <span>01</span>
                    <h4>Strategy Planning</h4>
                    <p>
                      Determine goals, audience, platforms and content strategy.
                    </p>
                  </div>
                  <div className="process-style-one-item">
                    <span>02</span>
                    <h4>Content Creation</h4>
                    <p>
                      Create graphics and write captions for your brand according to the strategy.
                    </p>
                  </div>
                  <div className="process-style-one-item">
                    <span>03</span>
                    <h4>Scheduling & Posting</h4>
                    <p>
                      Use programs to schedule the best times to post and check that all elements of the post are ready for publication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AppServicesDetails
