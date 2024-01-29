'use server';
import { subscribeToNewsletter } from '@/lib/newsletter';

export interface SubscribeState {
  
}

export async function subscribe(currentState: { status: string; errors?: Array<string> }, formData: FormData) {
  const email = formData.get('email') as string;

  const { status, errors } = await subscribeToNewsletter(email);

  if ( errors ) {
    return {
      status,
      errors: errors.map(({ message }: { message: string}) => message)
    }
  }

  return { status }
}