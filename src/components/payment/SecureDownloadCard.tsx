
import React from 'react';
import { Download, AlertCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SecureDownloadCardProps {
  isDownloading: boolean;
  isVerifying: boolean;
  downloadsRemaining: number | null;
  onDownload: () => void;
}

const SecureDownloadCard = ({
  isDownloading,
  isVerifying,
  downloadsRemaining,
  onDownload
}: SecureDownloadCardProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <Download className="w-8 h-8 mr-3" style={{ color: '#8da3e8' }} />
          <h3 className="text-xl font-semibold text-gray-900">Secure Download</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Your complete End-of-Life Conversation Playbook is ready for secure download.
        </p>

        {downloadsRemaining !== null && (
          <div className="flex items-center justify-center mb-4 p-3 bg-blue-50 rounded-lg">
            <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm text-blue-700">
              {downloadsRemaining} downloads remaining (expires in 30 days)
            </span>
          </div>
        )}
        
        <Button 
          size="lg"
          className="w-full text-white py-3 text-lg font-semibold mb-4 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#8da3e8' }}
          onClick={onDownload}
          disabled={isDownloading || isVerifying}
        >
          {isDownloading ? (
            <>Generating Secure Link...</>
          ) : isVerifying ? (
            <>Verifying Payment...</>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download Your Secure Playbook
            </>
          )}
        </Button>
        
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Mail className="w-4 h-4 mr-2" />
          <span>Secure download link - your purchase is verified</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureDownloadCard;
