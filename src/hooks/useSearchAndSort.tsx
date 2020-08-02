import { Site } from "interfaces/dataAPI";

export const useSearchAndSort = () => {

  const searchAndSort = (sites: Site[], filter: string, sortParam: string) => {
    const filteredSites = sites.filter(item => {
      const { siteName, userName } = item;

      if(filter) {
        const formatBy = (value: string) => {
          return value.toLowerCase().includes(filter.toLowerCase());
        }

        return formatBy(siteName) || formatBy(userName);
      } else {
        return sites;
      }

    })

    switch (sortParam) {
      case 'a-z':
        return filteredSites.sort((a, b) => {
          const aSiteNanme = a.siteName.toLowerCase();
          const bSiteNanme = b.siteName.toLowerCase();
          if (aSiteNanme < bSiteNanme) return -1;
          if (aSiteNanme > bSiteNanme) return 1;
          return 0;
        });
      case 'z-a':
        return filteredSites.sort((a, b) => {
          const aSiteNanme = a.siteName.toLowerCase();
          const bSiteNanme = b.siteName.toLowerCase();
          if (aSiteNanme > bSiteNanme) return -1;
          if (aSiteNanme < bSiteNanme) return 1;
          return 0;
        });
      case 'date':
        return filteredSites.sort((a, b) => {
          const aSiteNanme = a.modifiedAt;
          const bSiteNanme = b.modifiedAt;
          if (aSiteNanme > bSiteNanme) return -1;
          if (aSiteNanme < bSiteNanme) return 1;
          return 0;
        });
      case 'none':
        return filteredSites.reverse();
      default:
        return filteredSites;
    };

  };

  return { searchAndSort };

}
