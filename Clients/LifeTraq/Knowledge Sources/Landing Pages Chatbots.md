**Landing Pages with Chatbots:**

* Insurance Incentivization Use Case  
* Retention Use Case  
* Executive Coaching Use Case

**Chatbot Conversation Flow:**

1. **Greeting** \- "Hi, I am here to help you"  
2. **Ask for name** \- "How should I call you? What is your name?"  
3. **Ask about use case/challenges** \- "Can you explain how you currently operate or what your main challenges are?"  
4. **Context awareness** \- Bot should know which landing page it's on (Insurance vs Retention vs Executive Coaching) \- preferred approach  
5. **Rephrase understanding** \- "Let me rephrase for you. My understanding is..."  
6. **Qualifying questions (1-2 messages)** \- Ask about:  
   * Company/department size  
   * Urgency/timeline  
   * Scope  
   * Number of people  
7. **Provide solution**  \- "RIPLLL can do this, and this is how it works"  
8. **Offer more details** \- "Would you like more details? Can I explain more?"  
9. **Lead capture decision** \- "Would you like me to forward your interest to a member of our team?"  
   * **If YES:** Collect contact information  
   * **If NO:** Provide fallback email  
10. **Contact information to collect:**  
    * Name and surname  
    * Company name  
    * Job title/position  
    * Email address  
    * **NOT phone number** (too personal)  
11. **Confirmation** \- "Thank you, our team will reach out in 1-2 business days"  
12. **Alternative close if user declined to provide details** \- "Feel free to email hello@ripple.com for more questions"

**Technical Requirements:**

* Bot must know which landing page context it's in (Hayden to implement)  
* Must rephrase user input naturally (not copy-paste)  
* Keep conversation short (1-2 follow-up messages)  
* Only qualify interested leads  
* Use memorable contact email:

