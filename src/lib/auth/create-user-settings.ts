import prismadb from '@/lib/utils/database';

// Define the type for the user message
interface UserMessage {
  user: {
    id: string;
  };
}

export const createUserSettings = async (userMessage: UserMessage) => {
  const userPreferences = await prismadb.userSettings.findUnique({
    where: { userId: userMessage.user.id },
  });

  if (!userPreferences) {
    await prismadb.userSettings.create({
      data: {
        userId: userMessage.user.id,
        timezone_format: 'en-US',
      },
    });
  } 
}