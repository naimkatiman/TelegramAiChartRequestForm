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
import { Loader2 } from "lucide-react";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-8">
        {/* Requester Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Requester Information</h2>
          
          <FormField
            control={form.control}
            name="requesterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
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
            name="requesterEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className="px-4 py-2 border border-border rounded-md bg-input-background focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Instrument Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Instrument Selection</h2>
          
          {/* Equity Indices */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 form-section-title">Equity Indices</h3>
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
            <h3 className="text-lg font-medium text-gray-800 mb-3 form-section-title">Forex</h3>
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
            <h3 className="text-lg font-medium text-gray-800 mb-3 form-section-title">Commodities</h3>
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
        </div>

        {/* Preferred Indicators */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Preferred Indicators</h2>
          <div className="bg-muted p-4 rounded-md mb-4">
            <h3 className="text-base font-medium text-gray-800 mb-2 form-section-title">Default Indicators</h3>
            <div className="space-y-2 text-sm text-gray-700">
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
        </div>

        {/* Premium Bot Access */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Premium Bot Access</h2>
          <p className="text-sm text-gray-600 mb-3">Select who gets premium bot access (must be a RoboForex client)</p>
          
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
                        <RadioGroupItem value="roboClient" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Robo Client
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="indoClient" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Indo Client
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
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
            <p className="text-sm text-gray-700">You can brand this bot for selected VIP clients to boost value and promote RoboForex trading under your ID.</p>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Special Instructions</h2>
          <p className="text-sm text-gray-600 mb-2">Please refer to Brolysis (free) or BroPunch (premium) for reference</p>
          
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
        </div>

        {/* Form Controls */}
        <div className="flex flex-wrap justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="px-6 py-2 bg-input-background text-gray-700 border border-gray-300 rounded-md hover:bg-muted transition-colors"
          >
            Reset Form
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#0088cc] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
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
        </div>
      </form>
    </Form>
  );
}
