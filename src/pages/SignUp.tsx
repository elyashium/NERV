import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, BriefcaseIcon, AlertCircle, Code, Server, Database, Cloud, Smartphone, Palette, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  expertise: string[];
  experience: string;
};

const expertise = [
  { name: 'Frontend Development', icon: <Code className="h-4 w-4" /> },
  { name: 'Backend Development', icon: <Server className="h-4 w-4" /> },
  { name: 'Full Stack', icon: <Database className="h-4 w-4" /> },
  { name: 'DevOps', icon: <Cloud className="h-4 w-4" /> },
  { name: 'Mobile Development', icon: <Smartphone className="h-4 w-4" /> },
  { name: 'UI/UX Design', icon: <Palette className="h-4 w-4" /> },
];

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setError('');
      setLoading(true);
      await signup(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl w-full">
        <div className="bg-black/80 p-8 rounded-xl shadow-2xl border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-500">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('fullName', { required: 'Full name is required' })}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-white focus:border-white/50 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-white focus:border-white/50 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-white focus:border-white/50 focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <div className="relative">
                    <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      {...register('experience', { required: 'Experience is required' })}
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-white focus:border-white/50 focus:outline-none appearance-none transition-colors"
                    >
                      <option value="">Select experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
                  )}
                </div>
              </div>

              {/* Right Column - Expertise */}
              <div>
                <label className="block text-sm font-medium mb-3">Technical Expertise</label>
                <div className="bg-black/50 border border-white/20 p-5 rounded-lg">
                  <p className="text-sm text-gray-400 mb-4">Select all that apply to your skill set:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {expertise.map((skill) => (
                      <label key={skill.name} className="flex items-center p-3 bg-black/70 border border-white/10 rounded-lg hover:border-white/30 transition-all cursor-pointer">
                        <input
                          type="checkbox"
                          value={skill.name}
                          {...register('expertise', {
                            required: 'Select at least one expertise',
                          })}
                          className="rounded-sm bg-transparent border-white/30 text-white focus:ring-white mr-3"
                        />
                        <div className="flex items-center">
                          <span className="text-white mr-2">{skill.icon}</span>
                          <span className="text-sm">{skill.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.expertise && (
                    <p className="mt-2 text-sm text-red-500">{errors.expertise.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-white hover:text-gray-300 underline transition-colors">
                  Login here
                </Link>
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-white text-black rounded-lg hover:bg-black hover:text-white hover:border hover:border-white transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;