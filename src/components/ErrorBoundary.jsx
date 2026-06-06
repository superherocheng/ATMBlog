import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-500 mb-6 text-sm">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.hash = '#/';
            }}
            className="border border-wiki-black dark:border-gray-500 px-4 py-2 text-sm hover:bg-wiki-black hover:text-white dark:hover:bg-gray-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
