import { ref } from 'vue';

/**
 * Composable to calculate the profile completion percentage based on the provided profile data.
 * 
 * For the sample profile:
 * {
 *   "firstName": "Ene",
 *   "lastName": "Aba",
 *   "email": "ene@iqly.ai",
 *   "isEmailVerified": true,
 *   "profilePicture": "https://blackcountrystorage.blob.core.windows.net/blackcountry-dev/images/1740237672833-paystack-logo3.png",
 *   "phoneNumber": "4162209659"
 * }
 *
 * The profile is divided into four groups:
 * 1. Profile Picture (20%)
 * 2. Basic Information (firstName, lastName) (30%)
 * 3. Contact Information (email, phoneNumber) (30%)
 * 4. Email Verification (isEmailVerified) (20%)
 * 
 * @param profileData - The profile object with fields and values
 * @returns The profile completion percentage
 */
export const useProfileCompletion = (profileData) => {
  const completionPercentage = ref(0);

  // Define the grouped fields with their respective weights
  const profileGroups = {
    profilePicture: {
      fields: ['profilePicture'],
      weight: 20,
    },
    basicInformation: {
      fields: ['firstName', 'lastName'],
      weight: 30,
    },
    contactInformation: {
      fields: ['email', 'phoneNumber'],
      weight: 30,
    },
    emailVerification: {
      fields: ['isEmailVerified'],
      weight: 20,
    },
  };

  // Function to calculate the completion percentage
  const calculateCompletion = () => {
    let totalPercentage = 0;

    Object.values(profileGroups).forEach((group) => {
      const totalFields = group.fields.length;
      const filledFields = group.fields.filter((field) => {
        // If the field is boolean, consider it filled only if it is true.
        if (typeof profileData[field] === 'boolean') {
          return profileData[field] === true;
        }
        return profileData[field] !== null && profileData[field] !== undefined && profileData[field] !== '';
      }).length;

      const groupCompletion = (filledFields / totalFields) * group.weight;
      totalPercentage += groupCompletion;
    });

    completionPercentage.value = Math.round(totalPercentage);
  };

  // Initial calculation
  calculateCompletion();

  // Return the completion percentage
  return { completionPercentage };
};
