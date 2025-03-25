import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { botSubmissionFormSchema, BotSubmissionFormValues, BotSubmission } from "@shared/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { createBotSubmission } from "@/api/submission";
import { 
  Loader2, 
  LineChart, 
  DollarSign, 
  Gem, 
  TrendingUp,
  MessageCircle,
  Users,
  Facebook,
  User,
  HelpCircle,
  Bot,
  Star,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedHeader, AnimatedSection, AnimatedButton, AnimatedFormControls } from "@/components/form-animations";

interface TelegramBotFormProps {
  onSubmissionSuccess: (submission: BotSubmission) => void;
  onSubmissionError: (error: Error) => void;
}

export function TelegramBotForm({ onSubmissionSuccess, onSubmissionError }: TelegramBotFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherAccess, setShowOtherAccess] = useState(false);
  
  // Define the form with validation
  const form = useForm<BotSubmissionFormValues>({
    resolver: zodResolver(botSubmissionFormSchema),
    defaultValues: {
      requesterName: "",
      requesterEmail: "",
      telegramPhone: "+601169833882",
      equityIndices: [],
      otherEquity: "",
      forex: [],
      otherForex: "",
      commodities: [],
      otherCommodities: "",
      customIndicators: "",
      premiumAccess: "roboClient",
      otherAccess: "",
      specialInstructions: "",
    },
  });
  
  // Watch premium access value for conditional rendering
  const premiumAccessValue = form.watch("premiumAccess");
  
  useEffect(() => {
    setShowOtherAccess(premiumAccessValue === "other");
  }, [premiumAccessValue]);

  const onSubmit = async (values: BotSubmissionFormValues) => {
    setIsSubmitting(true);
    try {
      const submission = await createBotSubmission(values);
      form.reset();
      onSubmissionSuccess(submission);
    } catch (error) {
      onSubmissionError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setShowOtherAccess(false);
  };

  // Equity indices options
  const equityIndicesOptions = [
    { value: "DJIA", label: "Dow Jones (DJIA)" },
    { value: "NASDAQ", label: "Nasdaq 100" },
    { value: "SP500", label: "S&P 500" },
    { value: "TSLA", label: "Tesla (TSLA)" },
    { value: "NVDA", label: "Nvidia (NVDA)" },
    { value: "AAPL", label: "Apple (AAPL)" },
    { value: "AMZN", label: "Amazon (AMZN)" },
    { value: "GOOG", label: "Google (GOOG)" },
    { value: "META", label: "Meta (META)" },
  ];

  // Forex options
  const forexOptions = [
    { value: "EURUSD", label: "EUR/USD" },
    { value: "GBPUSD", label: "GBP/USD" },
    { value: "USDJPY", label: "USD/JPY" },
    { value: "AUDUSD", label: "AUD/USD" },
    { value: "USDCAD", label: "USD/CAD" },
  ];

  // Commodities options
  const commoditiesOptions = [
    { value: "XAUUSD", label: "Gold (XAU/USD)" },
    { value: "CRUDEOIL", label: "Crude Oil (WTI)" },
    { value: "XAGUSD", label: "Silver (XAG/USD)" },
  ];

  return (
    <Form {...form}>
      <motion.form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Requester Information */}
        <AnimatedSection delay={0}>
          <AnimatedHeader delay={0}>Requester Information</AnimatedHeader>
          
          <FormField
            control={form.control}
            name="requesterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-[#0088cc]" />
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="telegramPhone"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-[#0088cc]" />
                  Telegram Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+60113451267"
                    {...field}
                    className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  Enter your Telegram phone number in international format
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email field removed as requested */}
        </AnimatedSection>

        {/* Instrument Selection */}
        <AnimatedSection delay={0.1}>
          <AnimatedHeader delay={0.1}>Instrument Selection</AnimatedHeader>
          
          {/* Equity Indices */}
          <div>
            <h3 className="text-lg font-medium mb-3 form-section-title flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-[#0088cc]" />
              Equity Indices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="equityIndices"
                render={() => (
                  <FormItem>
                    {equityIndicesOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="equityIndices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    return checked
                                      ? field.onChange([...currentValues, option.value])
                                      : field.onChange(
                                          currentValues.filter((value) => value !== option.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="otherEquity"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="text-sm font-medium">Other Equity Indices</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter other equity indices"
                      {...field}
                      className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Forex */}
          <div>
            <h3 className="text-lg font-medium mb-3 form-section-title flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-[#0088cc]" />
              Forex
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="forex"
                render={() => (
                  <FormItem>
                    {forexOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="forex"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    return checked
                                      ? field.onChange([...currentValues, option.value])
                                      : field.onChange(
                                          currentValues.filter((value) => value !== option.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="otherForex"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="text-sm font-medium">Other Forex Pairs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter other forex pairs"
                      {...field}
                      className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Commodities */}
          <div>
            <h3 className="text-lg font-medium mb-3 form-section-title flex items-center">
              <Gem className="h-5 w-5 mr-2 text-[#0088cc]" />
              Commodities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="commodities"
                render={() => (
                  <FormItem>
                    {commoditiesOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="commodities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    return checked
                                      ? field.onChange([...currentValues, option.value])
                                      : field.onChange(
                                          currentValues.filter((value) => value !== option.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="otherCommodities"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel className="text-sm font-medium">Other Commodities</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter other commodities"
                      {...field}
                      className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </AnimatedSection>

        {/* Preferred Indicators */}
        <AnimatedSection delay={0.2}>
          <AnimatedHeader delay={0.2}>Preferred Indicators</AnimatedHeader>
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="text-base font-medium mb-2 form-section-title">Default Indicators</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Equity Indices:</strong> 200-EMA, MACD, RSI</p>
              <p><strong>Forex:</strong> 50-EMA, MACD, RSI</p>
              <p><strong>Commodities:</strong> Bollinger Bands, Super Trend, RSI</p>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="customIndicators"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Custom Indicators (max 3 per instrument)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Specify custom indicators if different from defaults"
                    {...field}
                    className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AnimatedSection>

        {/* Premium Bot Access */}
        <AnimatedSection delay={0.3}>
          <AnimatedHeader delay={0.3}>Premium Bot Access</AnimatedHeader>
          <p className="text-sm text-muted-foreground mb-3">Select who gets premium bot access. Please note that verification will take time (approximately 1 day) and requires a Telegram ID to proceed.</p>
          
          <FormField
            control={form.control}
            name="premiumAccess"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="space-y-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="telegramGroup" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2 text-[#0088cc]" />
                        Telegram Group
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="fbGroup" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer flex items-center">
                        <Facebook className="h-4 w-4 mr-2 text-[#0088cc]" />
                        FB Group
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="personalSelection" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer flex items-center">
                        <User className="h-4 w-4 mr-2 text-[#0088cc]" />
                        Personal Selection (Recommended)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-[#0088cc]" />
                        Other
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showOtherAccess && (
            <FormField
              control={form.control}
              name="otherAccess"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Specify other premium access"
                      {...field}
                      className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <div className="bg-muted p-4 rounded-md mt-2 border-l-4 border-[#0088cc]">
            <p className="text-sm text-muted-foreground">You can brand this bot for selected VIP clients to boost value and promote RoboForex trading under your ID. A Telegram ID will be required during the verification process.</p>
          </div>
        </AnimatedSection>

        {/* Special Instructions */}
        <AnimatedSection delay={0.4}>
          <AnimatedHeader delay={0.4}>Special Instructions</AnimatedHeader>
          <p className="text-sm text-muted-foreground mb-2">Please refer to Brolysis (free) or BroPunch (premium) for reference</p>
          
          <FormField
            control={form.control}
            name="specialInstructions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe specific customizations, prompts, features, or any additional requirements..."
                    {...field}
                    className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AnimatedSection>

        {/* Form Controls */}
        {/* Help & Resources Section */}
        <AnimatedSection delay={0.5}>
          <AnimatedHeader delay={0.5}>Help & Resources</AnimatedHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-md border-l-4 border-[#0088cc]">
                <h3 className="text-base font-medium mb-2 flex items-center">
                  <Bot className="h-4 w-4 mr-2 text-[#0088cc]" />
                  Free Version: BroLysis
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Try our free version to experience basic market analysis features
                </p>
                <a 
                  href="https://t.me/Robo_Market_Analysis_Bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0088cc] text-sm font-medium flex items-center hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open BroLysis Bot
                </a>
              </div>
              
              <div className="bg-muted p-4 rounded-md border-l-4 border-[#0088cc]">
                <h3 className="text-base font-medium mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-[#0088cc]" />
                  Premium Version: BroPunch
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Access advanced features with our premium version
                </p>
                <a 
                  href="https://t.me/Robo_Lysis_301_Bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0088cc] text-sm font-medium flex items-center hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open BroPunch Bot
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-md border-l-4 border-[#0088cc]">
                <h3 className="text-base font-medium mb-2 flex items-center">
                  <LineChart className="h-4 w-4 mr-2 text-[#0088cc]" />
                  Available Symbols
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Check all symbols available for analysis
                </p>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0088cc] text-sm font-medium flex items-center hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View supported symbols
                </a>
              </div>
              
              <div className="bg-muted p-4 rounded-md border-l-4 border-[#0088cc]">
                <h3 className="text-base font-medium mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-[#0088cc]" />
                  Available Indicators
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Explore all technical indicators available
                </p>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0088cc] text-sm font-medium flex items-center hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View supported indicators
                </a>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm text-muted-foreground">
                Need help? For any questions or support, please contact us at the Telegram number provided: +601169833882 (R - Naim IT)
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedFormControls>
          <AnimatedButton>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-6 py-2 form-button secondary-button flex items-center"
            >
              Reset Form
            </Button>
          </AnimatedButton>
          
          <AnimatedButton>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 form-button primary-button flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Submit Request
                </>
              )}
            </Button>
          </AnimatedButton>
        </AnimatedFormControls>
      </motion.form>
    </Form>
  );
}