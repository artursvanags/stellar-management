import { toast } from "@/components/ui/use-toast";
import { Filaments } from "@/types/database";

export const onDelete = async (data:Filaments) => {
  try {
    await fetch(`/api/filaments/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id }),
    });
  } catch (error) {
    console.error(
      'There has been a problem with your fetch operation:',
      error,
    );
  } finally {
    toast({
      description: `${data.manufacturer} has been deleted.`,
    });
  }
};
