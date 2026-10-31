/**
 * Lazy-loaded geographic data helpers.
 * Dynamically imports country-state-city on demand to prevent
 * bundling megabytes of worldwide geo-coordinates into the initial client bundle.
 */

export interface GeoOption {
  label: string;
  value: string;
  isoCode?: string;
}

let countriesPromise: Promise<GeoOption[]> | null = null;
const statesCache = new Map<string, GeoOption[]>();
const citiesCache = new Map<string, GeoOption[]>();

export async function getCountries(): Promise<GeoOption[]> {
  if (!countriesPromise) {
    countriesPromise = import('country-state-city').then(({ Country }) => {
      return Country.getAllCountries().map((c) => ({
        label: c.name,
        value: c.name,
        isoCode: c.isoCode,
      }));
    });
  }
  return countriesPromise;
}

export async function getStates(countryIsoCode: string): Promise<GeoOption[]> {
  if (!countryIsoCode) return [];
  if (statesCache.has(countryIsoCode)) {
    return statesCache.get(countryIsoCode)!;
  }
  const { State } = await import('country-state-city');
  const states = State.getStatesOfCountry(countryIsoCode).map((s) => ({
    label: s.name,
    value: s.name,
    isoCode: s.isoCode,
  }));
  statesCache.set(countryIsoCode, states);
  return states;
}

export async function getCities(countryIsoCode: string, stateIsoCode: string): Promise<GeoOption[]> {
  if (!countryIsoCode || !stateIsoCode) return [];
  const key = `${countryIsoCode}-${stateIsoCode}`;
  if (citiesCache.has(key)) {
    return citiesCache.get(key)!;
  }
  const { City } = await import('country-state-city');
  const cities = City.getCitiesOfState(countryIsoCode, stateIsoCode).map((c) => ({
    label: c.name,
    value: c.name,
  }));
  citiesCache.set(key, cities);
  return cities;
}

