interface TvlEntry {
    date: number;
    totalLiquidityUSD: number;
  }
  
  interface ChainTvl {
    tvl: TvlEntry[];
  }
  
  interface BlazeStakeData {
    id: string;
    name: string;
    address: string;
    symbol: string;
    assetToken: string;
    url: string;
    description: string;
    chain: string;
    logo: string;
    audits: string;
    audit_note: string | null;
    gecko_id: string;
    cmcId: string;
    category: string;
    chains: string[];
    module: string;
    twitter: string;
    forkedFrom: string[];
    oracles: string[];
    audit_links: string[];
    listedAt: number;
    chainTvls: {
      [chain: string]: ChainTvl;
    };
    currentChainTvls: {
        [chain : string]: number
    },
  }

  export type {
    BlazeStakeData
  }