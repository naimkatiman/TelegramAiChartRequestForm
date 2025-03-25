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
  ExternalLink,
  MessageSquareCode,
  SendHorizonal
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
        className="p-6 md:p-8 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Requester Information */}
        <AnimatedSection delay={0}>
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-[#0088cc]" />
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          </div>
          
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="requesterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="px-4 py-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="telegramPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Telegram Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+60113451267"
                      {...field}
                      className="px-4 py-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Enter your Telegram phone number in international format
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </AnimatedSection>

        {/* Instrument Selection */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <LineChart className="h-5 w-5 text-[#0088cc]" />
            <h2 className="text-xl font-semibold text-gray-800">Trading Instruments</h2>
          </div>
          
          {/* Equity Indices */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-700">
                <TrendingUp className="h-5 w-5 text-[#0088cc]" />
                Equity Indices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
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
                                className="flex flex-row items-center space-x-3 space-y-0 mb-3 group"
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
                                    className="border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                                  />
                                </FormControl>
                                <FormLabel className="text-gray-700 cursor-pointer group-hover:text-[#0088cc] transition-colors duration-200">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="otherEquity"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-gray-700">Other Equity Indices</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter additional equity indices"
                        {...field}
                        className="px-4 py-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Forex Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-700">
                <DollarSign className="h-5 w-5 text-[#0088cc]" />
                Forex Pairs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
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
                                className="flex flex-row items-center space-x-3 space-y-0 mb-3 group"
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
                                    className="border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                                  />
                                </FormControl>
                                <FormLabel className="text-gray-700 cursor-pointer group-hover:text-[#0088cc] transition-colors duration-200">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="otherForex"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-gray-700">Other Forex Pairs</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter additional forex pairs"
                        {...field}
                        className="px-4 py-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Commodities Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-700">
                <Gem className="h-5 w-5 text-[#0088cc]" />
                Commodities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
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
                                className="flex flex-row items-center space-x-3 space-y-0 mb-3 group"
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
                                    className="border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                                  />
                                </FormControl>
                                <FormLabel className="text-gray-700 cursor-pointer group-hover:text-[#0088cc] transition-colors duration-200">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="otherCommodities"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-gray-700">Other Commodities</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter additional commodities"
                        {...field}
                        className="px-4 py-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Custom Indicators */}
        <AnimatedSection delay={0.2}>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquareCode className="h-5 w-5 text-[#0088cc]" />
            <h2 className="text-xl font-semibold text-gray-800">Custom Settings</h2>
          </div>
          
          <FormField
            control={form.control}
            name="customIndicators"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Custom Indicators</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your custom indicators and settings"
                    {...field}
                    className="min-h-[120px] px-4 py-3 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Specify any custom indicators or settings you'd like to add to your bot
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </AnimatedSection>

        {/* Premium Access */}
        <AnimatedSection delay={0.3}>
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-[#0088cc]" />
            <h2 className="text-xl font-semibold text-gray-800">Access Level</h2>
          </div>
          
          <FormField
            control={form.control}
            name="premiumAccess"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="roboClient"
                          className="border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                        />
                      </FormControl>
                      <FormLabel className="text-gray-700 cursor-pointer">
                        Robo Client
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="other"
                          className="border-gray-300 text-[#0088cc] focus:ring-[#0088cc]"
                        />
                      </FormControl>
                      <FormLabel className="text-gray-700 cursor-pointer">
                        Other
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {showOtherAccess && (
            <FormField
              control={form.control}
              name="otherAccess"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="text-gray-700">Specify Access Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your access type"
                      {...field}
                      className="px-4 py-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          )}
        </AnimatedSection>

        {/* Special Instructions */}
        <AnimatedSection delay={0.4}>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquareCode className="h-5 w-5 text-[#0088cc]" />
            <h2 className="text-xl font-semibold text-gray-800">Additional Instructions</h2>
          </div>
          
          <FormField
            control={form.control}
            name="specialInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Special Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any special instructions or requirements"
                    {...field}
                    className="min-h-[120px] px-4 py-3 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </AnimatedSection>

        {/* Submit Button */}
        <AnimatedSection delay={0.5}>
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#0088cc] hover:bg-[#006699] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <SendHorizonal className="h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              Reset
            </Button>
          </div>
        </AnimatedSection>
      </motion.form>
    </Form>
  );
}