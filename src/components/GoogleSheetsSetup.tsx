import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Settings, X, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const GoogleSheetsSetup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptUrl, setScriptUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUrl = localStorage.getItem('googleScriptUrl');
    if (savedUrl) {
      setScriptUrl(savedUrl);
      setIsSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (!scriptUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter your Google Apps Script URL.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('googleScriptUrl', scriptUrl);
    setIsSaved(true);
    toast({
      title: "Saved!",
      description: "Google Sheets integration is now active.",
    });
    setIsOpen(false);
  };

  const copyInstructions = () => {
    const instructions = `Google Apps Script Code:

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Upwork Profile', 'Selected Plan', 'Message', 'Source']);
    }
    
    // Append the data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone || '',
      data.upworkProfile || '',
      data.selectedPlan,
      data.message,
      data.source
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
    
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Google Apps Script code copied to clipboard.",
    });
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 glass rounded-full hover:border-primary/50 transition-colors glow-primary"
      >
        <Settings className="w-5 h-5 text-primary" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 glass rounded-2xl border border-primary/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Google Sheets Setup</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect form submissions to Google Sheets by following these steps:
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center">1</span>
                      <p className="text-sm text-muted-foreground">
                        Create a new Google Sheet and open Extensions → Apps Script
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center">2</span>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">
                          Copy and paste the script code:
                        </p>
                        <Button
                          onClick={copyInstructions}
                          variant="outline"
                          size="sm"
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          {copied ? 'Copied!' : 'Copy Script Code'}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center">3</span>
                      <p className="text-sm text-muted-foreground">
                        Deploy as Web App (Execute as: Me, Access: Anyone)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center">4</span>
                      <p className="text-sm text-muted-foreground">
                        Copy the Web App URL and paste it below
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Google Apps Script Web App URL
                  </label>
                  <Input
                    value={scriptUrl}
                    onChange={(e) => {
                      setScriptUrl(e.target.value);
                      setIsSaved(false);
                    }}
                    placeholder="https://script.google.com/macros/s/..."
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  {isSaved && (
                    <p className="text-xs text-primary mt-2 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Integration active
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Configuration
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://script.google.com/', '_blank')}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default GoogleSheetsSetup;
