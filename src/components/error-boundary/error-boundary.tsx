import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback Ul goes here
      return (
        <div className="w-full z-10 overflow-auto bg-neutral-50 text-lg relative top-0 left-0">
          <h1 className="bg-red-600 p-3 text-white font-medium sticky top-0 left-0">
            Something went wrong: <span> {this.state.error?.name}</span>
          </h1>
          <div className="py-4">
            <p className="px-3 text-sm">{this.state.error?.message}</p>
            <p className="px-3 bg-neutral-100 py-4 overflow-auto whitespace-nowrap text-red-600 text-xs">
              {this.state.error?.stack}
            </p>
          </div>
        </div>
      );
    }
    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
