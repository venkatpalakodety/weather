import React from 'react'

type State = { error: Error | null }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { error: null }
    this.reload = this.reload.bind(this)
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You could log to an external service here
    // console.error('ErrorBoundary caught', error, info)
  }

  reload() {
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl w-full glass-light rounded-2xl p-6 text-slate-900">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="mb-4 text-sm text-slate-700">An unexpected error occurred: <span className="font-medium">{this.state.error.message}</span></p>
            <div className="flex gap-3">
              <button onClick={this.reload} className="px-4 py-2 rounded-md bg-sky-600 text-white">Reload</button>
              <button onClick={() => this.setState({ error: null })} className="px-4 py-2 rounded-md border">Dismiss</button>
            </div>
            <details className="mt-4 text-xs text-slate-600">
              <summary>Details</summary>
              <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
            </details>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
