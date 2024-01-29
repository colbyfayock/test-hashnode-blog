'use client';

import { cn } from '@/lib/utils';
import { useFormState } from 'react-dom';

import { subscribe } from '@/app/actions';

import Button from "@/components/Button";

interface FormNewsletterProps {
  className?: string;
}

const FormNewsletter = ({ className }: FormNewsletterProps) => {
  const [state, formAction] = useFormState(subscribe, {
    status: undefined,
    errors: undefined
  });

  console.log('state', state)

  return (
    <form action={formAction} className={cn(className)}>
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3" htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" className="w-full max-w-64 rounded" />
      </div>
      <div>
        <Button className="w-full max-w-64 xl:w-auto xl:max-w-none">Submit</Button>
      </div>
      {state.status && (
        <div>
          {state.status === 'PENDING' && (
            <p className="bg-green-100 mt-6 px-4 py-2 rounded">Check your email!</p>
          )}
          {state.status === 'ERROR' && (
            <>
              {state.errors?.length > 0 && state.errors.map((error: string) => {
                return <p key={error} className="bg-red-100 mt-6 px-4 py-2 rounded">{ error }</p>
              })}
              {(!state.errors || state.errors?.length === 0) && (
                <p className="bg-red-100 mt-6 px-4 py-2 rounded">Something went wrong.</p>
              )}
            </>
          )}
        </div>
      )}
    </form>
  )
}

export default FormNewsletter;