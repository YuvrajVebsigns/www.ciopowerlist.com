import { use } from 'react';
import { DynamicForm } from '@/components/forms/DynamicForm';

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export default function PublicFormPage({ params }: FormPageProps) {
  const { slug } = use(params);
  const formSlug = slug === 'cio-nomination' ? 'nomination-google-form' : slug;

  return (
    <main className="cio-nomination-page">
      <DynamicForm slug={formSlug} />
    </main>
  );
}
