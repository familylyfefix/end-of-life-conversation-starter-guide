
import React from 'react';

const VideoPreview = () => {
  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl shadow-2xl">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe 
                    src="https://www.loom.com/embed/6c08afc65caa4aeb8d3c4dbd2732ea49?sid=360b1d6a-0218-45e3-87fd-e946e8cbf7bc"
                    frameBorder="0"
                    allowFullScreen
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      borderRadius: '8px'
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
