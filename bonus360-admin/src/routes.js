import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Dashboard
import Dashboard from './pages/Dashboard';
import MetricsSummary from './pages/dashboard/MetricsSummary';
import PerformanceCharts from './pages/dashboard/PerformanceCharts';
import GeneralReports from './pages/dashboard/GeneralReports';

// Authentication
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Campaigns
import Campaigns from './pages/campaigns/Campaigns';
import CreateCampaign from './pages/campaigns/CreateCampaign';
import EditCampaign from './pages/campaigns/EditCampaign';
import CampaignRules from './pages/campaigns/CampaignRules';
import CampaignSegmentation from './pages/campaigns/CampaignSegmentation';

// Coupons
import Coupons from './pages/coupons/Coupons';
import GenerateCoupons from './pages/coupons/GenerateCoupons';
import ManageCoupons from './pages/coupons/ManageCoupons';
import CouponValidation from './pages/coupons/CouponValidation';
import CouponLimits from './pages/coupons/CouponLimits';
import CouponRedemption from './pages/coupons/CouponRedemption';

// Gift Cards
import GiftCards from './pages/giftcards/GiftCards';
import CreateGiftCard from './pages/giftcards/CreateGiftCard';
import ManageGiftCards from './pages/giftcards/ManageGiftCards';
import GiftCardBalance from './pages/giftcards/GiftCardBalance';
import GiftCardHistory from './pages/giftcards/GiftCardHistory';
import GiftCardSettings from './pages/giftcards/GiftCardSettings';

// Product Bundling
import Bundles from './pages/bundles/Bundles';
import CreateBundle from './pages/bundles/CreateBundle';
import ManageBundles from './pages/bundles/ManageBundles';
import BundlePricing from './pages/bundles/BundlePricing';
import BundleProducts from './pages/bundles/BundleProducts';
import BundleValidity from './pages/bundles/BundleValidity';

// Loyalty Programs
import LoyaltyPrograms from './pages/loyalty/LoyaltyPrograms';
import ConfigureLoyalty from './pages/loyalty/ConfigureLoyalty';
import LoyaltyTiers from './pages/loyalty/LoyaltyTiers';
import PointsRedemption from './pages/loyalty/PointsRedemption';
import LoyaltyMetrics from './pages/loyalty/LoyaltyMetrics';
import LoyaltyHistory from './pages/loyalty/LoyaltyHistory';

// Referral Programs
import ReferralPrograms from './pages/referral/ReferralPrograms';
import ConfigureReferral from './pages/referral/ConfigureReferral';
import ReferralCodes from './pages/referral/ReferralCodes';
import ReferralRewards from './pages/referral/ReferralRewards';
import ReferralMonitoring from './pages/referral/ReferralMonitoring';
import ReferralReports from './pages/referral/ReferralReports';

// Digital Wallets
import DigitalWallets from './pages/wallets/DigitalWallets';
import WalletBalance from './pages/wallets/WalletBalance';
import WalletTransactions from './pages/wallets/WalletTransactions';
import WalletRedemption from './pages/wallets/WalletRedemption';

// Gamification
import Gamification from './pages/gamification/Gamification';
import GameMechanics from './pages/gamification/GameMechanics';
import PointsSystem from './pages/gamification/PointsSystem';
import BadgesAchievements from './pages/gamification/BadgesAchievements';
import ChallengesMissions from './pages/gamification/ChallengesMissions';
import Leaderboards from './pages/gamification/Leaderboards';

// Reports and Analytics
import Reports from './pages/reports/Reports';
import CustomDashboards from './pages/reports/CustomDashboards';
import CampaignMetrics from './pages/reports/CampaignMetrics';
import DataExport from './pages/reports/DataExport';
import ABTesting from './pages/reports/ABTesting';

// System Settings
import Settings from './pages/settings/Settings';
import GlobalParams from './pages/settings/GlobalParams';
import Integrations from './pages/settings/Integrations';
import Notifications from './pages/settings/Notifications';
import UserManagement from './pages/settings/UserManagement';
import Permissions from './pages/settings/Permissions';
import ActivityLogs from './pages/settings/ActivityLogs';
import FraudPrevention from './pages/settings/FraudPrevention';

// Error Pages
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* Dashboard Routes */}
                <Route exact path="/" component={Dashboard} />
                <Route path="/metrics-summary" component={MetricsSummary} />
                <Route path="/performance-charts" component={PerformanceCharts} />
                <Route path="/general-reports" component={GeneralReports} />

                {/* Authentication Routes */}
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                {/* Campaign Routes */}
                <Route exact path="/campaigns" component={Campaigns} />
                <Route path="/campaigns/create" component={CreateCampaign} />
                <Route path="/campaigns/edit/:id" component={EditCampaign} />
                <Route path="/campaigns/rules" component={CampaignRules} />
                <Route path="/campaigns/segmentation" component={CampaignSegmentation} />

                {/* Coupon Routes */}
                <Route exact path="/coupons" component={Coupons} />
                <Route path="/coupons/generate" component={GenerateCoupons} />
                <Route path="/coupons/manage" component={ManageCoupons} />
                <Route path="/coupons/validation" component={CouponValidation} />
                <Route path="/coupons/limits" component={CouponLimits} />
                <Route path="/coupons/redemption" component={CouponRedemption} />

                {/* Gift Card Routes */}
                <Route exact path="/gift-cards" component={GiftCards} />
                <Route path="/gift-cards/create" component={CreateGiftCard} />
                <Route path="/gift-cards/manage" component={ManageGiftCards} />
                <Route path="/gift-cards/balance" component={GiftCardBalance} />
                <Route path="/gift-cards/history" component={GiftCardHistory} />
                <Route path="/gift-cards/settings" component={GiftCardSettings} />

                {/* Bundle Routes */}
                <Route exact path="/bundles" component={Bundles} />
                <Route path="/bundles/create" component={CreateBundle} />
                <Route path="/bundles/manage" component={ManageBundles} />
                <Route path="/bundles/pricing" component={BundlePricing} />
                <Route path="/bundles/products" component={BundleProducts} />
                <Route path="/bundles/validity" component={BundleValidity} />

                {/* Loyalty Program Routes */}
                <Route exact path="/loyalty" component={LoyaltyPrograms} />
                <Route path="/loyalty/configure" component={ConfigureLoyalty} />
                <Route path="/loyalty/tiers" component={LoyaltyTiers} />
                <Route path="/loyalty/redemption" component={PointsRedemption} />
                <Route path="/loyalty/metrics" component={LoyaltyMetrics} />
                <Route path="/loyalty/history" component={LoyaltyHistory} />

                {/* Referral Program Routes */}
                <Route exact path="/referral" component={ReferralPrograms} />
                <Route path="/referral/configure" component={ConfigureReferral} />
                <Route path="/referral/codes" component={ReferralCodes} />
                <Route path="/referral/rewards" component={ReferralRewards} />
                <Route path="/referral/monitoring" component={ReferralMonitoring} />
                <Route path="/referral/reports" component={ReferralReports} />

                {/* Digital Wallet Routes */}
                <Route exact path="/wallets" component={DigitalWallets} />
                <Route path="/wallets/balance" component={WalletBalance} />
                <Route path="/wallets/transactions" component={WalletTransactions} />
                <Route path="/wallets/redemption" component={WalletRedemption} />

                {/* Gamification Routes */}
                <Route exact path="/gamification" component={Gamification} />
                <Route path="/gamification/mechanics" component={GameMechanics} />
                <Route path="/gamification/points" component={PointsSystem} />
                <Route path="/gamification/badges" component={BadgesAchievements} />
                <Route path="/gamification/challenges" component={ChallengesMissions} />
                <Route path="/gamification/leaderboards" component={Leaderboards} />

                {/* Reports and Analytics Routes */}
                <Route exact path="/reports" component={Reports} />
                <Route path="/reports/dashboards" component={CustomDashboards} />
                <Route path="/reports/campaign-metrics" component={CampaignMetrics} />
                <Route path="/reports/export" component={DataExport} />
                <Route path="/reports/ab-testing" component={ABTesting} />

                {/* Settings Routes */}
                <Route exact path="/settings" component={Settings} />
                <Route path="/settings/global-params" component={GlobalParams} />
                <Route path="/settings/integrations" component={Integrations} />
                <Route path="/settings/notifications" component={Notifications} />
                <Route path="/settings/users" component={UserManagement} />
                <Route path="/settings/permissions" component={Permissions} />
                <Route path="/settings/activity-logs" component={ActivityLogs} />
                <Route path="/settings/fraud-prevention" component={FraudPrevention} />

                {/* Error Routes */}
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routes;