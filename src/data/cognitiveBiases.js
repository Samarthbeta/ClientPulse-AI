export const COGNITIVE_BIASES = [
  {
    id: "loss_aversion",
    name: "Loss Aversion / Fear of Regret",
    category: "High Urgency",
    description: "Humans feel the pain of losing $100 twice as intensely as the joy of gaining $100.",
    formula: "Highlight the active financial hemorrhage happening every day they delay.",
    example: "Every day your front desk misses after-hours calls, you lose $450 in booked appointments."
  },
  {
    id: "social_proof",
    name: "Social Proof / Bandwagon Effect",
    category: "Trust & Safety",
    description: "People look to peers to determine correct behavior when uncertain.",
    formula: "Show credible peer volume and recognizable reference points.",
    example: "Join 140+ clinic directors who automated their patient intake this quarter."
  },
  {
    id: "anchoring",
    name: "Price Anchoring",
    category: "Value Perception",
    description: "The first number mentioned sets the mental baseline for value.",
    formula: "Compare against hiring a full-time employee or doing it manually at high cost.",
    example: "Hiring a full-time sales rep costs $65,000/yr. Our automated system is $4,800/yr."
  },
  {
    id: "authority",
    name: "Appeal to Authority",
    category: "Credibility",
    description: "People obey established experts, data benchmarks, and industry leaders.",
    formula: "Cite specific industry metrics, case studies, or institutional frameworks.",
    example: "Built using the conversion frameworks tested by top Y Combinator and Inc 5000 companies."
  },
  {
    id: "system_blame",
    name: "Externalized Blame (System-Blame)",
    category: "Emotional Relief",
    description: "People hate feeling stupid or at fault. Blaming the outdated tool lowers defensiveness.",
    formula: "It's not your fault you're working 70-hour weeks—it's the obsolete manual stack.",
    example: "You didn't fail at marketing. Traditional agencies sold you vanity metrics that don't convert."
  },
  {
    id: "scarcity",
    name: "Artificial & Real Scarcity",
    category: "Action Trigger",
    description: "Items and opportunities appear significantly more valuable when availability is limited.",
    formula: "Limit intake capacity strictly based on quality or time constraints.",
    example: "We only onboard 3 new clients per month to ensure dedicated implementation attention."
  },
  {
    id: "risk_reversal",
    name: "Complete Risk Reversal (Guarantees)",
    category: "Friction Removal",
    description: "When the buyer takes zero risk, saying 'no' becomes irrational.",
    formula: "If you don't achieve X outcome in Y days, you pay $0 and keep the system.",
    example: "If we don't generate at least 15 qualified client meetings in 30 days, 100% refund."
  },
  {
    id: "endowment_effect",
    name: "Endowment Effect",
    category: "Ownership",
    description: "People value things much more once they feel psychological ownership over them.",
    formula: "Give a prototype, audit, or customized roadmap before they buy.",
    example: "Here is your customized 90-day growth blueprint—already built specifically for your firm."
  }
];

export const POWER_COMBOS = [
  {
    name: "The Lethal Conversion Trifecta",
    biases: ["Loss Aversion", "System-Blame", "Risk Reversal"],
    useCase: "Cold Outreach & Landing Pages",
    effect: "Removes defensiveness, exposes the bleeding leak, and makes the solution zero-risk."
  },
  {
    name: "The Enterprise Authority Closer",
    biases: ["Price Anchoring", "Social Proof", "Scarcity"],
    useCase: "High-Ticket Client Proposals ($3,000 - $10,000+)",
    effect: "Makes premium pricing feel like an absolute bargain with limited capacity."
  }
];
