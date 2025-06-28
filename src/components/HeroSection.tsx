
import React, { useEffect } from 'react';
import { Heart, Shield, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  useEffect(() => {
    // Load ConvertKit script
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://f.convertkit.com/ckjs/ck.5.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 pt-12 pb-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Brand Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/e3788226-80d2-4a3c-9279-757104cd413f.png" 
            alt="Family Lyfe Fix Logo" 
            className="h-24 mx-auto mb-4"
          />
        </div>
        
        <Badge className="mb-6" style={{ backgroundColor: '#ff8a58', color: 'white' }}>
          <Heart className="w-4 h-4 mr-2" />
          100% FREE Forever
        </Badge>
        
        {/* Primary Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Finally Have <span style={{ color: '#8da3e8' }}>The Conversation</span> Your Family Needs
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Get the proven conversation starters that help families discuss end-of-life wishes with love, clarity, and confidence—without the awkwardness
        </p>

        {/* Family photo under heading */}
        <div className="mb-12">
          <img 
            src="/lovable-uploads/e859eb8e-6409-4b8d-85f5-b40fbf68e148.png" 
            alt="Family celebrating together at dinner table"
            className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* ConvertKit Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div 
            dangerouslySetInnerHTML={{
              __html: `
                <form action="https://app.kit.com/forms/8243832/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="8243832" data-uid="099ebad777" data-format="inline" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:false,&quot;url&quot;:&quot;https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800" style="background-color: rgb(255, 255, 255); border-radius: 6px; box-shadow: 0 2px 15px 0 rgba(210,214,220,0.5); max-width: 700px; overflow: hidden; margin: 0 auto;">
                  <div data-style="full">
                    <div data-element="column" class="formkit-column" style="background-color: rgb(249, 250, 251); padding: 40px; position: relative;">
                      <div class="formkit-background" style="opacity: 0.3;"></div>
                      <div class="formkit-header" data-element="header" style="color: rgb(77, 77, 77); font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 20px; z-index: 2; position: relative;">
                        <h2>Download Your FREE Guide Now</h2>
                      </div>
                      <div class="formkit-subheader" data-element="subheader" style="color: rgb(104, 104, 104); font-size: 15px; margin: 15px 0; z-index: 2; position: relative;">
                        <p>Get instant access to your End-of-Life Conversation Starter Guide</p>
                      </div>
                      <div class="formkit-image formkit-image relative focus:outline-none" role="button" tabindex="0" style="z-index: 2; position: relative;">
                        <img class="cursor-pointer focus:outline-blue" src="https://embed.filekitcdn.com/e/7FuyG31Wt7UTxDaCZFVzX6/fymMjtvx6PnpDjfG7CH9N1" style="max-width: 100%;">
                      </div>
                    </div>
                    <div data-element="column" class="formkit-column" style="padding: 40px; position: relative;">
                      <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                      <div data-element="fields" class="seva-fields formkit-fields">
                        <div class="formkit-field" style="margin: 0 0 15px 0;">
                          <input class="formkit-input" aria-label="First Name" name="fields[first_name]" placeholder="First Name" type="text" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400; background: #ffffff; font-size: 15px; padding: 12px; border: 1px solid #e3e3e3; width: 100%; line-height: 1.4; margin: 0; transition: border-color ease-out 300ms;">
                        </div>
                        <div class="formkit-field" style="margin: 0 0 15px 0;">
                          <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400; background: #ffffff; font-size: 15px; padding: 12px; border: 1px solid #e3e3e3; width: 100%; line-height: 1.4; margin: 0; transition: border-color ease-out 300ms;">
                        </div>
                        <button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(141, 163, 232); border-radius: 24px; font-weight: 700; border: 0; cursor: pointer; display: inline-block; text-align: center; font-size: 15px; margin-bottom: 15px; overflow: hidden; padding: 0; position: relative; vertical-align: middle; width: 100%;">
                          <div class="formkit-spinner" style="display: flex; height: 0px; width: 0px; margin: 0 auto; position: absolute; top: 0; left: 0; right: 0; overflow: hidden; text-align: center; transition: all 300ms ease-in-out;">
                            <div style="margin: auto; width: 12px; height: 12px; background-color: #fff; opacity: 0.3; border-radius: 100%; display: inline-block; animation: formkit-bouncedelay-formkit-form-data-uid-099ebad777- 1.4s infinite ease-in-out both; animation-delay: -0.32s;"></div>
                            <div style="margin: auto; width: 12px; height: 12px; background-color: #fff; opacity: 0.3; border-radius: 100%; display: inline-block; animation: formkit-bouncedelay-formkit-form-data-uid-099ebad777- 1.4s infinite ease-in-out both; animation-delay: -0.16s;"></div>
                            <div style="margin: auto; width: 12px; height: 12px; background-color: #fff; opacity: 0.3; border-radius: 100%; display: inline-block; animation: formkit-bouncedelay-formkit-form-data-uid-099ebad777- 1.4s infinite ease-in-out both;"></div>
                          </div>
                          <span style="display: block; transition: all 300ms ease-in-out; padding: 12px 24px;">Subscribe</span>
                        </button>
                      </div>
                      <div class="formkit-guarantee" data-element="guarantee" style="color: rgb(77, 77, 77); font-size: 13px; font-weight: 400; margin: 0 0 15px 0;">
                        We respect your privacy. Unsubscribe at any time.
                      </div>
                    </div>
                  </div>
                </form>

                <style>
                  @keyframes formkit-bouncedelay-formkit-form-data-uid-099ebad777- {
                    0%, 80%, 100% { 
                      transform: scale(0);
                    } 
                    40% { 
                      transform: scale(1);
                    }
                  }
                  
                  .formkit-form[data-uid="099ebad777"] .formkit-input:focus {
                    outline: none;
                    border-color: #8da3e8;
                    transition: border-color ease 300ms;
                  }
                  
                  .formkit-form[data-uid="099ebad777"] .formkit-submit:hover > span {
                    background-color: rgba(0,0,0,0.1);
                  }
                  
                  .formkit-form[data-uid="099ebad777"] .formkit-submit[data-active] .formkit-spinner {
                    opacity: 1;
                    height: 100%;
                    width: 50px;
                  }
                  
                  .formkit-form[data-uid="099ebad777"] .formkit-submit[data-active] .formkit-spinner ~ span {
                    opacity: 0;
                  }
                  
                  @media (max-width: 600px) {
                    .formkit-form[data-uid="099ebad777"] [data-style="full"] {
                      display: block;
                    }
                    
                    .formkit-form[data-uid="099ebad777"] .formkit-column {
                      padding: 20px;
                    }
                  }
                  
                  @media (min-width: 600px) {
                    .formkit-form[data-uid="099ebad777"] [data-style="full"] {
                      display: grid;
                      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    }
                    
                    .formkit-form[data-uid="099ebad777"] .formkit-column:nth-child(2) {
                      border-top: none;
                    }
                  }
                </style>
              `
            }}
          />
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Always Free
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            100% Private & Secure
          </div>
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Instant Download
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
