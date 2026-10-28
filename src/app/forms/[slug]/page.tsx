import { use } from 'react';
import { DynamicForm } from '@/components/forms/DynamicForm';

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export default function PublicFormPage({ params }: FormPageProps) {
  const { slug } = use(params);
  const formSlug = slug === 'nomination-google-form' ? 'cio-nomination' : slug;

  return (
    <main className="cio-nomination-page">
      <DynamicForm slug={formSlug} />
    </main>
  );
}
