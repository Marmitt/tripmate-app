import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tripData, preferences } = await req.json();
    
    console.log('Received trip data:', tripData);
    console.log('Received preferences:', preferences);

    // Create comprehensive prompt for ChatGPT
    const prompt = `Create a detailed travel itinerary based on the following information:

TRIP DETAILS:
- Start Country: ${tripData.startCountry}
- End Country: ${tripData.endCountry}
- Intermediate Countries: ${tripData.intermediateCountries?.join(', ') || 'None'}
- Start Date: ${tripData.startDate}
- End Date: ${tripData.endDate}
- Duration: ${Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24))} days

TRAVELER PREFERENCES:
- Number of travelers: ${preferences.travelers}
- Budget: ${preferences.budget}
- Travel pace: ${preferences.pace}
- Preferred vibes: ${preferences.vibes?.join(', ') || 'Not specified'}
- Accommodation type: ${preferences.accommodation}
- Interests: ${preferences.interests?.join(', ') || 'Not specified'}
- Must-do activities: ${preferences.mustDos || 'Not specified'}
- Things to avoid: ${preferences.avoids || 'Not specified'}
- Open to surprises: ${preferences.surprises ? 'Yes' : 'No'}

Please provide:
1. A day-by-day detailed itinerary
2. Recommended accommodations for each location
3. Transportation suggestions between countries/cities
4. Budget breakdown
5. Local tips and cultural insights
6. Must-try food and restaurants
7. Packing recommendations
8. Emergency contacts and important information

Format the response in a clear, easy-to-read structure with headings and bullet points.`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert travel planner with extensive knowledge of destinations worldwide. Create comprehensive, personalized travel itineraries that are practical, detailed, and exciting.'
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const travelPlan = data.choices[0].message.content;

    console.log('Successfully generated travel plan');

    return new Response(JSON.stringify({ 
      success: true,
      travelPlan,
      tripData,
      preferences
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-travel-plan function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});