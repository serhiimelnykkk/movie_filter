interface FormProps {
  onSubmit?: (...args: unknown[]) => unknown;
  children: React.ReactNode;
}

export default function Form({
  onSubmit,
  children,
  ...rest
}: FormProps & React.FormHTMLAttributes<HTMLFormElement>) {
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmission} {...rest}>
      {children}
    </form>
  );
}
