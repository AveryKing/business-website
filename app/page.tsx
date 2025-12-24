import { 
  FileText, 
  Database, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileSearch, 
  Lock,
  Zap,
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Diviora</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-300 hover:text-white transition-colors">Services</a>
              <a href="#solutions" className="text-slate-300 hover:text-white transition-colors">Solutions</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            </div>
            <div>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-slate-800 rounded-full mb-6">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">Enterprise Data Automation</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Automate Boring Back-Office Work
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Stop wasting hours on manual data entry. Diviora transforms your paper trails, PDFs, and trapped ERP data into actionable intelligence—automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Schedule a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a 
                  href="#solutions" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold text-lg backdrop-blur-sm"
                >
                  See How It Works
                </a>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-500">95%</div>
                  <div className="text-sm text-gray-400 mt-1">Time Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-500">99.8%</div>
                  <div className="text-sm text-gray-400 mt-1">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-500">48hrs</div>
                  <div className="text-sm text-gray-400 mt-1">Setup Time</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-slate-900 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-500" />
                      <div className="flex-1">
                        <div className="h-3 bg-slate-700 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-slate-900 rounded-lg">
                      <Database className="w-6 h-6 text-blue-500" />
                      <div className="flex-1">
                        <div className="h-3 bg-slate-700 rounded w-2/3 mb-2"></div>
                        <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                      </div>
                      <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-slate-900 rounded-lg opacity-50">
                      <Server className="w-6 h-6 text-gray-500" />
                      <div className="flex-1">
                        <div className="h-3 bg-slate-700 rounded w-3/5 mb-2"></div>
                        <div className="h-2 bg-slate-700 rounded w-2/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="solutions" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stop Losing Time on Data Bottlenecks
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every day your team battles the same frustrating problems. We eliminate them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pain Point 1 */}
            <div className="bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-500/15 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Manual Data Entry Hell</h3>
              <p className="text-slate-300 leading-relaxed">
                Your team spends 15+ hours per week typing shipment details, invoices, and purchase orders from PDFs into your ERP system.
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-500/15 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Trapped ERP Data</h3>
              <p className="text-slate-300 leading-relaxed">
                Critical operational data sits locked in legacy on-premise systems—impossible to integrate with modern tools without IT intervention.
              </p>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-500/15 rounded-lg flex items-center justify-center mb-4">
                <FileSearch className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lost in Paper Trails</h3>
              <p className="text-slate-300 leading-relaxed">
                Job site photos, delivery receipts, and inspection reports pile up in email and file shares—unsearchable and disconnected.
              </p>
            </div>

            {/* Pain Point 4 */}
            <div className="bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-500/15 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Inconsistent Formats</h3>
              <p className="text-slate-300 leading-relaxed">
                Every vendor sends data differently—scanned PDFs, Excel sheets, photos of BOLs. Your team wastes time standardizing everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Solutions
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Purpose-built data automation for logistics and construction operations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Service 1: PDF-to-SQL */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-10 text-white shadow-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Intelligent PDF-to-SQL Pipeline</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Upload invoices, BOLs, packing slips, or job estimates—our AI extracts every data point and writes it directly to your database with 99.8% accuracy.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Handles scanned documents, photos, and native PDFs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Custom field mapping for your specific forms and invoices</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Validates data against your business rules automatically</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Batch processing for thousands of documents</span>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                <div className="text-sm font-semibold text-gray-400 mb-2">TYPICAL USE CASE</div>
                <p className="text-white">
                  A logistics company processes 500+ delivery receipts daily. Diviora reduced manual entry from 20 hours/week to 15 minutes of review time.
                </p>
              </div>
            </div>

            {/* Service 2: On-Premise Sync */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-10 text-white shadow-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Secure On-Premise ERP Sync</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Bridge your legacy systems with modern analytics. Our on-site connector syncs data from SAP, Oracle, AS/400, or custom databases—without exposing sensitive information to the cloud.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Runs behind your firewall for complete data sovereignty</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Real-time or scheduled sync to data warehouse or BI tools</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">No changes to your existing ERP setup required</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">SOC 2 Type II compliant with audit logging</span>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                <div className="text-sm font-semibold text-gray-400 mb-2">TYPICAL USE CASE</div>
                <p className="text-white">
                  A construction firm unified data from 3 legacy systems into a single dashboard—enabling real-time project cost tracking without an expensive ERP migration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Enterprise-Grade Security You Can Trust</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We understand that your operational data is your competitive advantage. Diviora is built for regulated industries with strict compliance requirements.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">SOC 2 Type II Certified</h4>
                    <p className="text-gray-400">Annual third-party audits of our security controls</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">On-Premise Deployment Option</h4>
                    <p className="text-gray-400">Your data never leaves your infrastructure if required</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">End-to-End Encryption</h4>
                    <p className="text-gray-400">Data encrypted in transit and at rest using AES-256</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold text-blue-500 mb-2">100%</div>
                  <div className="text-gray-300">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-blue-500 mb-2">{'<'}24h</div>
                  <div className="text-gray-300">Average Implementation Time</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-blue-500 mb-2">50+</div>
                  <div className="text-gray-300">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Eliminate Manual Data Entry?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join logistics and construction companies saving 20+ hours per week. Schedule a personalized demo and see your data automation in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@diviora.com" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Schedule Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="mailto:sales@diviora.com" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white rounded-lg border-2 border-white hover:bg-white/10 transition-colors font-semibold text-lg"
            >
              Talk to Sales
            </a>
          </div>
          <p className="mt-8 text-blue-100 text-sm">
            No credit card required • 48-hour setup • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Diviora</h3>
              <p className="text-sm leading-relaxed">
                Enterprise data automation for logistics and construction operations.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-white transition-colors">PDF-to-SQL</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">On-Premise Sync</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Data Integration</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Logistics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Construction</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Manufacturing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Diviora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
