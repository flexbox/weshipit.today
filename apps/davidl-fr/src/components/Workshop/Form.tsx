import { Input } from '../Newsletter/style';

interface FormProps {
  errorMessage: string;
  onSubmit(e: any): Promise<void>;
  isLoading: boolean;
}

const Form = ({ errorMessage, onSubmit, isLoading }: FormProps) => {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-gray-900">
          <h2 className="mb-6 mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
            Sign into your <br /> account
          </h2>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="youare@wesom.me"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? 'Loading…' : 'Email a Login Link'}
              </button>
            </div>

            <div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
