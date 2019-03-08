import { helper } from '@ember/component/helper';

export function rentalPropertyType(params/*, hash*/) {
  const communityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Apartment'
];

const communityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Apartment'
];

export function rentalPropertyType([propertyType]) {
  if (communityPropertyTypes.includes(propertyType)) {
    return 'Community';
  }

  return 'Standalone';
}

export default helper(rentalPropertyType);