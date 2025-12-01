export function WebnovelsFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <span>© 2025-{year} Webnovels. All rights reserved.</span>

        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-500 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
